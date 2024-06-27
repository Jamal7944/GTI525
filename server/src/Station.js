import {ObjParser} from "./utility/Parser.js"

export class Station {
	static #getPastHourlyRelevantInfo(objRow) {
		const temp = Number.parseFloat(objRow["Temp (°C)"]);
		const windChill = Number.parseFloat(objRow["Wind Chill"]);
		const humidex = Number.parseFloat(objRow["Humidex"]);

		return {
			trueTemp: temp,
			feltTemp: temp + windChill + humidex,
			weather: objRow["Weather"],
			humidity:Number.parseFloat( objRow["Rel Hum (%)"]),
			windDirection: Number.parseFloat(objRow["Wind Dir (10s deg)"]),
			windSpeed: Number.parseFloat(objRow["Wind Spd (km/h)"]),
			atmosPressure: Number.parseFloat(objRow["Stn Press (kPa)"])
		};
	}

	static #getPastHourlyForecastURL(stationID, year, month, day) {
		return `https://climate.weather.gc.ca/climate_data/bulk_data_e.html?format=csv&stationID=${stationID}&Year=${year}Month=${month}&Day=${day}&timeframe=1&submit=%20Download+Data`;
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

	static async getPastHourlyForecast(idList, year, month, day) {
		let result = [];

		for(let id in idList) {
			let url = this.#getPastHourlyForecastURL(id, year, month, day);
			let response = await fetch(url)
			
			let text = response.text();
			let csv = ObjParser.parse(text);
			let obj = ObjParser.csvToObj(csv);
	
			for(let row in obj) {
				let data = this.#getPastHourlyRelevantInfo(row);
				result.push(data);
			}

			if(result.length > 0) {
				break;
			}
		}
		
		return result;
	}
}