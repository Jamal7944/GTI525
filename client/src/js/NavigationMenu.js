import Papa from "papaparse"; // Importez Papaparse
import DataStatMenu from "./DataStatMenu";
import PastHourlyForecast from "./PastHourlyForecast";
import ForecastWeek from "./ForecastWeek";
import { Station } from "./Stations/Station";

export default {
	name: "NavigationMenu",
	data() {
		return {
			ListeStations: [],
			ProvinceStations: [],
			allStations: false
		};
	},
	mounted() {
		this.loadStations();
	},
	methods: {
		async loadStations() {
			try {
				const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv");
				const csvText = await response.text();
				const validIDs = ["118", "1865", "2205", "3002", "3328", "3698", "4337", "4789", "4932", "5097", "5251", "5415", "6207", "6358", "6633", "6720"];
				this.ListeStations = Papa.parse(this.removeFirstLines(csvText, 3), { header: true }).data.filter((data) => {
					return validIDs.includes(data["Station ID"]);
				});

				this.ProvinceStations = {}; // Initialisation de ProvinceStations comme un objet vide

				this.ListeStations.forEach((station) => {
					const province = station.Province;
					if (!this.ProvinceStations[province]) {
						this.ProvinceStations[province] = [];
					}
					this.ProvinceStations[province].push(station);
				});
			} catch (error) {
				console.error("Erreur lors du chargement du fichier CSV :", error);
			}
		},
		removeFirstLines(text, numberOfLinesToRemove) {
			const lines = text.split("\n");
			const remainingLines = lines.slice(numberOfLinesToRemove).join("\n");
			return remainingLines;
		},
		LoadDataStation(id) {
			console.log(id);
			Station.setID(id);
			PastHourlyForecast.methods.search();
			ForecastWeek.methods.getForecastView(id);
			DataStatMenu.methods.stationSelectorChange(id);
			document.getElementById("station_displayed_id").innerHTML = this.ListeStations.find((objet) => objet["Station ID"] === id).Name;
		},

		expandStations() {
			var listAccordionItem = document.getElementsByClassName("accordion-button");
			var listAccordionDiv = document.getElementsByClassName("accordion-collapse");
			for (var index = 0; index < listAccordionItem.length; index++) {
				if (!this.allStations) {
					listAccordionItem[index].classList.remove("collapsed");
					listAccordionDiv[index].classList.add("show");
				} else {
					listAccordionDiv[index].classList.add("collapse");
					listAccordionItem[index].classList.add("collapsed");
					listAccordionDiv[index].classList.remove("show");
				}
			}
			this.allStations = !this.allStations;
		},

		selectStations(id) {
			try {
				if (this.allStations) {
					var listAccordionItem = document.getElementsByClassName("accordion-button");
					var listAccordionDiv = document.getElementsByClassName("accordion-collapse");
					for (var index = 0; index < listAccordionDiv.length; index++) {
						listAccordionDiv[index].classList.add("collapse");
						listAccordionItem[index].classList.add("collapsed");
						listAccordionDiv[index].classList.remove("show");
					}
					var selectedDiv = document.getElementById("collapse" + id.index);
					var selectBtn = document.getElementById("buttonNav" + id.index);
					selectedDiv.classList.add("show");
					selectBtn.classList.remove("collapsed");
					this.allStations = !this.allStations;
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
};
