import { DateUtils } from "./Utils/Date";
import { TableUtils } from "./Utils/Table";
import { Station } from "./Stations/Station";

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
			document.getElementById("PHF-result").innerHTML = '<div class="spinner-border" style="margin-bottom:2rem" role="status"><span class="sr-only"></span></div>'
			let stnID = Station.getID();
			let y = Number.parseInt(document.getElementById("PHF-year").value);
			let m = Number.parseInt(document.getElementById("PHF-month").selectedIndex + 1);
			let d = Number.parseInt(document.getElementById("PHF-day").value);

			if (Number.isNaN(stnID) || Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
				// il y a un bug avec comment vue.js fonctionne...
				// on dirait que les select box ne se remplissent pas avant que le search soit exécuté...
				y = 1900;
				m = 1;
				d = 1;
				// c'est la date par défaut qui s'affiche lorsqu'on clique pour la première fois sur l'onglet.
			}

			let body = {
				stationID: stnID,
				year: y,
				month: m,
				day: d
			};

			let info = {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				mode: "cors",
				body: JSON.stringify(body)
			};

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
					document.getElementById("PHF-result").innerHTML = await response.text();
				}
			});
		}
	}
};
