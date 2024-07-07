import { Logger } from "../utility/Logger.js";
import {ObjParser} from "../utility/Parser.js"
import { Result } from "../utility/Result.js";

export class StationPastHourlyForecast {
	static #getPastHourlyRelevantInfo(objRow) {
		let temp = Number.parseFloat(objRow["Temp (°C)"]);
		let windChill = 0;
		let humidex = 0;

		windChill = (objRow["Wind Chill"] == "") 
			? 0 
			: Number.parseInt(objRow["Wind Chill"]);

		humidex = (objRow["Hmdx"] == "") 
			? 0
			: Number.parseInt(objRow["Hmdx"]);

		return {
			//_wndChill: windChill,
			//_hmdx: humidex,
			trueTemp: temp,
			feltTemp: temp + windChill + humidex,
			weather: objRow["Weather"],
			humidity:Number.parseFloat( objRow["Rel Hum (%)"]),
			windDirection: Number.parseFloat(objRow["Wind Dir (10s deg)"]),
			windSpeed: Number.parseFloat(objRow["Wind Spd (km/h)"]),
			atmosPressure: Number.parseFloat(objRow["Stn Press (kPa)"])
		};
	}

	static async #fetchPastHourlyForecast(stationID, year, month, day) {
		let log = new Logger("StationPastHourlyForecast", "fetchPastHourlyForecast");
		let result = Result.failed();
		let url = `https://climate.weather.gc.ca/climate_data/bulk_data_e.html?format=csv&stationID=${stationID}&Year=${year}&Month=${month}&Day=${day}&timeframe=1&submit=%20Download+Data`;
		log.info(`Contacting ${url} ...`);

		let response = await fetch(url);
		if(response.ok) {
			log.info("Contact successful.");
			log.newline();
			let text = await response.text();
			result = Result.success(text);
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
			"Température réelle",
			"Température ressentie",
			"Météo",
			"Humidité",
			"Direction du vent",
			"Vitesse du vent",
			"Pression atmosphérique"
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
				let data = this.#getPastHourlyRelevantInfo(row);
				result.push(data);
			});
	
			log.info(`Gathered ${result.length} rows with id ${id}.`);
			log.newline();
			return result;
		}

		return [];
	}
}