import {TableUtils} from "./Utils/Table";

export default {
	name: "PastHourlyForecast",
	data() {
		return {
			pastHourlyForecastHtml: ""
		};
	},

	mounted() {
		this.pastHourlyForecastHtml = TableUtils.generateNotAvailable();
	},

	methods: {
		searchButton_onClick() {
			let stnID = Number.parseInt(document.getElementById("PHF-stnID").value);
			let y = Number.parseInt(document.getElementById("PHF-year").value);
			let m = Number.parseInt(document.getElementById("PHF-month").value);
			let d = Number.parseInt(document.getElementById("PHF-day").value);

			let body = {
				stationID: stnID,
				year: y,
				month: m,
				day: d
			};

			if (Number.isNaN(stnID) || Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
				this.pastHourlyForecastHtml = TableUtils.generateError("One or more of the inputs is not a number.");
				return;
			}

			let info = {
				headers: {"Content-Type": "application/json"},
				method: "POST",
				mode: "cors",
				body: JSON.stringify(body)
			};

			fetch("http://localhost:8081/station/past-hourly-forecast", info).then(async (response) => {
				let result = JSON.parse(await response.text());
				console.log(result);
				this.pastHourlyForecastHtml = result["info"].length == 0 ? TableUtils.generateError("") : TableUtils.generateHTML(result["header"], result["info"]);
			});
		}
	}
};
