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

	static async getPastHourlyForecast(stationID, year, month, day) {
		let url = `https://climate.weather.gc.ca/climate_data/bulk_data_e.html?format=csv&stationID=${stationID}&Year=${year}Month=${month}&Day=${day}&timeframe=1&submit=%20Download+Data`;
		let result = [];
		fetch(url).then((response) => {
			let text = response.text();
			let csv = ObjParser.parse(text);
			let obj = ObjParser.csvToObj(csv);

			for(let row in obj) {
				let data = this.#getPastHourlyRelevantInfo(row);
				result.push(data);
			}
		})

		return result;
	}
}