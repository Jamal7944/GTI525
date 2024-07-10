import { DateUtils } from "./Utils/Date";
import { TableUtils } from "./Utils/Table";

export default {
	name: "PastHourlyForecast",
	data() {
		return {
			years:[],
			monthNames: [],
			days:[],
		};
	},

	mounted() {
		document.getElementById("PHF-result").innerHTML = "";
		let currentYear = Number.parseInt(new Date().getFullYear());
		this.years = DateUtils.getYears(1900, currentYear);
		this.monthNames = DateUtils.getMonths()
		this.days = DateUtils.getDays();
		this.search();
	},

	methods: {
		changeID(id) {
			this.clear();
			document.getElementById("PHF-id").textContent = id;
		},

		clear() {
			document.getElementById("PHF-year").selectedIndex = 0;
			document.getElementById("PHF-month").selectedIndex = 0;
			document.getElementById("PHF-day").selectedIndex = 0;
			document.getElementById("PHF-result").innerHTML = TableUtils.generateNotAvailable();
		},

		search() {
			let stnID = Number.parseInt(document.getElementById("PHF-id").textContent);
			let y = Number.parseInt(document.getElementById("PHF-year").value);
			let m = Number.parseInt(document.getElementById("PHF-month").selectedIndex + 1);
			let d = Number.parseInt(document.getElementById("PHF-day").value);

			let body = {
				stationID: stnID,
				year: y,
				month: m,
				day: d
			};

			if (Number.isNaN(stnID) || Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
				document.getElementById("PHF-result").innerHTML = TableUtils.generateError("One or more of the inputs is not a number.");
				return;
			}

			let info = {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				mode: "cors",
				body: JSON.stringify(body)
			};

			document.getElementById("PHF-result").innerHTML = TableUtils.generateError("Chargement...");
			fetch("http://localhost:8081/station/past-hourly-forecast", info).then(async (response) => {
				if (response.ok) {
					let text = await response.text();
					console.log(text);

					let result = JSON.parse(text);
					console.log(result);
					
					if(result["info"].length == 0) 
						document.getElementById("PHF-result").innerHTML = TableUtils.generateError("Données non disponibles pour " + y + "/" + m + "/" + d + ". Veuillez choisir une autre journée.");
					else 
						document.getElementById("PHF-result").innerHTML = TableUtils.generateHTMLWithTitle("Prévisions pour le " + y + "/" + m + "/" + d, result["header"], result["info"]);
				}
				else {
					console.log(await response.text());
				}
			});
		}
	}
};
