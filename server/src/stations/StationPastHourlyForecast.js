import { Logger } from "../utility/Logger.js";
import {ObjParser} from "../utility/Parser.js"
import { Result } from "../utility/Result.js";
import NodeCache from "node-cache";
import { connectForecastHourly } from './mongoDBConnection.js';
const pastHourlyForecastCache = new NodeCache();

export class StationPastHourlyForecast {
	// source: https://www.weather.gov/ama/heatindex
	static #c1 = -42.379;
	static #c2 = 2.04901523;
	static #c3 = 10.14333127;
	static #c4 = -0.22475541;
	static #c5 = -6.83783 * Math.pow(10, -3);
	static #c6 = -5.481717 * Math.pow(10, -2);
	static #c7 = 1.22874 * Math.pow(10, -3);
	static #c8 = 8.5282 * Math.pow(10, -4);
	static #c9 = -1.99 * Math.pow(10, -6);

	static #convertCtoF(C) {
		return C * (9 / 5) + 32;
		// source: https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/c-to-f-formula-1638963368.png
	}

	static #convertFtoC(F) {
		return (F - 32) / 1.8;
		// source: https://www.calculatorsoup.com/images/calculators/converters/fahrenheit_to_celsius_c18.png
	}

	static #getFeltTemperature(trueTemperature, relativeHumidity, windSpeed) {
		if(trueTemperature === "Non disponible")
			return "Non disponible";

		// refroidissment éolien | source : https://fr.wikipedia.org/wiki/Temp%C3%A9rature_ressentie
		if(trueTemperature < 10) {
			if(windSpeed === "Non disponible")
				return "Non disponible";

			if(windSpeed > 4.8) {
				let result = 13.12 + 0.6215 * trueTemperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * trueTemperature * Math.pow(windSpeed, 0.16);
				return result.toFixed(2);
			}
			else {
				let result = trueTemperature + 0.2 * (0.1345 * trueTemperature - 1.59) * windSpeed;
				return result.toFixed(2);
			}
		}

		// indice de chaleur | source https://www.weather.gov/ama/heatindex
		else {
			if(relativeHumidity === "Non disponible")
				return "Non disponible";

			let F = this.#convertCtoF(trueTemperature);
			let t1 = this.#c1;
			let t2 =  this.#c2 * F; 
			let t3 = this.#c3 * relativeHumidity;
			let t4 = this.#c4 * F * relativeHumidity;
			let t5 = this.#c5 * Math.pow(F, 2);
			let t6 = this.#c6 * Math.pow(relativeHumidity, 2);
			let t7 = this.#c7 * Math.pow(F, 2) * relativeHumidity;
			let t8 = this.#c8 * F * Math.pow(relativeHumidity, 2);
			let t9 = this.#c9 * Math.pow(F, 2) * Math.pow(relativeHumidity, 2);
			let result = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9;

			return this.#convertFtoC(result).toFixed(2);
		}
	}

	static #getPastHourlyRelevantInfo(objRow) {
		let trueTemp = Number.isNaN(Number.parseFloat(objRow["Temp (°C)"])) ? "Non disponible" : Number.parseFloat(objRow["Temp (°C)"]);
		let humidity = Number.isNaN(Number.parseFloat( objRow["Rel Hum (%)"])) ? "Non disponible" : Number.parseFloat( objRow["Rel Hum (%)"]);
		let windSpeed = Number.isNaN(Number.parseFloat(objRow["Wind Spd (km/h)"])) ? "Non disponible" : Number.parseFloat(objRow["Wind Spd (km/h)"]);
		let feltTemp = this.#getFeltTemperature(trueTemp, humidity, windSpeed);
		
		return {
			dateTime: objRow["Date/Time (LST)"],
			trueTemp: trueTemp,
			feltTemp: feltTemp,
			weather: (objRow["Weather"] == null) ? "Non disponible" : objRow["Weather"],
			humidity: humidity,
			windDirection: Number.isNaN(Number.parseFloat(objRow["Wind Dir (10s deg)"])) ? "Non disponible" : Number.parseFloat(objRow["Wind Dir (10s deg)"]),
			windSpeed: windSpeed,
			atmosPressure: Number.isNaN(Number.parseFloat(objRow["Stn Press (kPa)"])) ? "Non disponible" : Number.parseFloat(objRow["Stn Press (kPa)"])
		};
	}

	static async #fetchPastHourlyForecast(stationID, year, month, day) {
		let log = new Logger("StationPastHourlyForecast", "fetchPastHourlyForecast");
		let result = Result.failed();
		let url = `https://climate.weather.gc.ca/climate_data/bulk_data_e.html?format=csv&stationID=${stationID}&Year=${year}&Month=${month}&Day=${day}&timeframe=1&submit=%20Download+Data`;
		log.info(`Contacting ${url} ...`);
		//let data = pastHourlyForecastCache.get(stationID);
		const data= await connectForecastHourly();
		const cachedData = await data.findOne({ _id: stationID });

		if(cachedData){
			log.info("We have a cached CSV item");
			return cachedData.value;
		}

		let response = await fetch(url);
		if(response.ok) {
			log.info("Contact successful.");
			log.newline();
			let text = await response.text();
			result = Result.success(text);
			await data.insertOne({ _id: stationID, value: result, createdAt: new Date() });
			log.info("Cached CSV set");
		}
		else {
			log.error("Unable to retrieve desired data.");
			log.error(`stationID: ${stationID}, year: ${year}, month: ${month}, day: ${day}`);
			log.newline();
		}

		return result;
	}

	static getPastHourlyForecastHeader() {
		return [
			"Heure & Date",
			"Température réelle (°C)",
			"Température ressentie (°C)",
			"Météo",
			"Humidité (%)",
			"Direction du vent (dizaines de °)",
			"Vitesse du vent (km/h)",
			"Pression atmosphérique (kPa)"
		];
	}

	static async getPastHourlyForecast(id, year, month, day) {
		let log = new Logger("StationPastHourlyForecast", "getPastHourlyForecast");
		let data = await this.#fetchPastHourlyForecast(id, year, month, day);

		if(data.success) {
			let result = [];
			let csv = ObjParser.parse(await data.result);
			let obj = ObjParser.csvToObj(csv, 0);
	
			obj.forEach((row) => {
				let timestamp = new String(row["Date/Time (LST)"]).split(" ")[0];
				let timestampDay = Number.parseInt(timestamp.split("-")[2]); // yyyy-MM-dd HH:mm
				let specifiedDay = Number.parseInt(day);

				// on vérifie si le jour correspond à celui demandé puisque
				// le fetch nous donne un .CSV pour le mois au complet. 
				if(timestampDay == specifiedDay) {
					let data = this.#getPastHourlyRelevantInfo(row);
					result.push(data);
				}					
			});
	
			log.info(`Gathered ${result.length} rows with id ${id}.`);
			log.newline();
			return result;
		}

		return [];
	}
}