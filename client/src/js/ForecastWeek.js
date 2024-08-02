import { ParagraphUtils } from "./Utils/Paragraph";

export default {
	name: "ForecastWeek",
	data() {
		return {
			ForecastHtmlWeek: "<p>Hello world</p>"
		};
	},

	mounted() {
		this.ForecastHtmlWeek = ParagraphUtils.generateError();
	},

	methods: {
		async getForecastView(stationID) {
			let stnID = stationID;
			let body = {
				stationID: stnID
			};
			let info = {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				mode: "cors",
				body: JSON.stringify(body)
			};
			let result = await fetch("http://localhost:8081/station/forecast", info);
			let data = "";
			if (result.ok) {
				data = await result.json();
				console.log(data);
			}

			let nameStation = data[0];
			let linkStation = data[1]
			let lastUpdated = data[2];
			let alarm = data[3];
			let currentConditions = data[4];
			let forecast = data[5];

			var results = [[nameStation, linkStation, lastUpdated, alarm, currentConditions, forecast]];
			let forecastHeader = this.getForecastViewHeader();

			this.ForecastHtmlWeek = ParagraphUtils.generateParagraphWithTitle("Prévision", forecastHeader, results);
			document.getElementById("forecastweek-result").innerHTML = this.ForecastHtmlWeek;
		},

		getForecastViewHeader() {
			return [
				"Nom de la station",
				"Lien",
				"Mis à jour le",
				"Veilles et avertissements météo",
				"Conditions actuelles",
				"Prévisions pour les prochains jours"
			];
		}
	}
};