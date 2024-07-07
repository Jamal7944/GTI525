import {Assert} from "../Utils/Assert";
import {DateUtils} from "../Utils/Date";
import {ObjParser} from "../Utils/Parser";

export class Station {
	static stationInventory = [];
	static stationMetrics = [];
	static validIDs = ["118", "1865", "2205", "3002", "3328", "3698", "4337", "4789", "4932", "5097", "5251", "5415", "6207", "6358", "6633", "6720"];

	/**
	 * Charges l'inventaire de station météo.
	 */
	static loadStationInventory(context, thenCallback) {
		let filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv";
		ObjParser.csvToObj(filename, 2).then((result) => {
			this.stationInventory = result.filter((data) => {
				return this.validIDs.includes(data["Station ID"]);
			});

			if (result.length == 0) return;
			thenCallback(context, result.length != 0);
		});
	}

	/**
	 * Charges les métriques d'une station météo.
	 * @param {number} stationID L'identifiant unique de la station météo.
	 */
	static loadStationMetrics(stationID, context, thenCallback) {
		Assert.type(stationID, "number", "stationID");

		let filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + stationID + ".csv";
		ObjParser.csvToObj(filename, 0).then((result) => {
			if (result == undefined) return;
			this.stationMetrics = result;
			thenCallback(context);
		});
	}

	/**
	 *
	 * @returns Une liste des identifiants des stations météos.
	 */
	static getStationIdList() {
		let list = [];
		this.stationInventory.forEach((element) => {
			list.push(element["Station ID"]);
		});
		return list;
	}

	/**
	 * Sélectionne les données d'une station à afficher selon intervalle de temps.
	 * @param {*} fromDate Date de début;
	 * @param {*} toDate Date de fin.
	 */
	static selectMetricsView(fromDate, toDate) {
		Assert.type(fromDate, "number", "fromDate");
		Assert.type(toDate, "number", "toDate");

		let selectedSnapshots = [];
		this.stationMetrics.forEach((element) => {
			let year = Number.parseInt(element["Year"]);
			let month = Number.parseInt(element["Month"]);

			let elementDate = DateUtils.getFormatedDate(year, month);
			if (elementDate >= fromDate && elementDate <= toDate) {
				let view = [];
				view["Year"] = element["Year"];
				view["Month"] = element["Month"];
				view["Mean Max Temp (°C)"] = element["Mean Max Temp (°C)"];
				view["Mean Min Temp (°C)"] = element["Mean Min Temp (°C)"];
				view["Mean Temp (°C)"] = element["Mean Temp (°C)"];
				view["Extr Max Temp (°C)"] = element["Extr Max Temp (°C)"];
				view["Extr Min Temp (°C)"] = element["Extr Min Temp (°C)"];
				view["Total Rain (mm)"] = element["Total Rain (mm)"];
				view["Total Snow (cm)"] = element["Total Snow (cm)"];
				view["Spd of Max Gust (km/h)"] = element["Spd of Max Gust (km/h)"];
				selectedSnapshots.push(view);
			}
		});

		return selectedSnapshots;
	}

	/**
	 *
	 * @returns Retourne les entêtes pour l'affichages des données.
	 */
	static getMetricsViewHeader() {
		return [
			"Années",
			"Mois",
			"Temps Moyen Max (°C)",
			"Temps Moyen Min (°C)",
			"Temps Moyen (°C)",
			"Temps Max Enregistré (°C)",
			"Temps Min Enregistré (°C)",
			"Pluie(mm)",
			"Neige(cm)",
			"Vitesse du vent(km/h)"
		];
	}

	/**
	 *
	 * @returns Retourne un objet contenant les champs de statistiques globales à remplir.
	 */
	static getGlobalStatsTemplate() {
		return [
			{
				Donnée: "Température moyenne mensuelle (°C)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Mois max": "",
				"Valeur minimale": Infinity,
				"Année min": "",
				"Mois min": ""
			},
			{
				Donnée: "Température extrême (°C)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Mois max": "",
				"Valeur minimale": Infinity,
				"Année min": "",
				"Mois min": ""
			},
			{
				Donnée: "Quantité de pluie (cm)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Mois max": "",
				"Valeur minimale": Infinity,
				"Année min": "",
				"Mois min": ""
			},
			{
				Donnée: "Quantité de neige (cm)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Mois max": "",
				"Valeur minimale": Infinity,
				"Année min": "",
				"Mois min": ""
			},
			{
				Donnée: "Vitesse du vent (km/h)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Mois max": "",
				"Valeur minimale": Infinity,
				"Année min": "",
				"Mois min": ""
			}
		];
	}

	/**
	 *
	 * @param {number} fromDate Date indiquant le début de la période voulue.
	 * @param {number} toDate Date indiquant la fin de la période voulue.
	 * @returns Retourne les maximums et les minimums de certaines données pour la période voulue.
	 */
	static getGlobalStatistics(fromDate, toDate) {
		let globalStats = this.getGlobalStatsTemplate();

		/**
		 *
		 * @param {any} element Objet représentant un instantané de station.
		 * @param {string} minEntry Variable de minimum.
		 * @param {string} maxEntry Variable de maximum.
		 * @param {any} globalStatsRef Référence d'un objet de statistique globale.
		 * @param {string} variable Variable de la statistique globale.
		 */
		let setMinMaxValues = function (element, maxEntry, minEntry, variable) {
			Assert.type(minEntry, "string", "minEntry");
			Assert.type(maxEntry, "string", "maxEntry");
			Assert.type(variable, "number", "variable");

			let curObj = globalStats[variable];
			let curMax = curObj["Valeur maximale"];
			let curMin = curObj["Valeur minimale"];
			let minVal = Number.parseFloat(element[minEntry]);
			let maxVal = Number.parseFloat(element[maxEntry]);
			if (isNaN(minVal) || isNaN(maxVal)) {
				return;
			}

			// algorithme pour trouver la moyenne de la donnée
			let avgVal = (minVal + maxVal) / 2.0;

			if (curMax < avgVal) {
				curObj["Valeur maximale"] = avgVal.toFixed(2);
				curObj["Année max"] = element["Year"];
				curObj["Mois max"] = element["Month"];
			}
			if (curMin > avgVal) {
				curObj["Valeur minimale"] = avgVal.toFixed(2);
				curObj["Année min"] = element["Year"];
				curObj["Mois min"] = element["Month"];
			}
		};

		this.stationMetrics.forEach((element) => {
			let year = Number.parseInt(element["Year"]);
			let month = Number.parseInt(element["Month"]);

			let elementDate = DateUtils.getFormatedDate(year, month);
			if (elementDate >= fromDate && elementDate <= toDate) {
				setMinMaxValues(element, "Mean Max Temp (°C)", "Mean Min Temp (°C)", 0);
				setMinMaxValues(element, "Extr Max Temp (°C)", "Extr Min Temp (°C)", 1);
				setMinMaxValues(element, "Total Rain (mm)", "Total Rain (mm)", 2);
				setMinMaxValues(element, "Total Snow (cm)", "Total Snow (cm)", 3);
				setMinMaxValues(element, "Spd of Max Gust (km/h)", "Spd of Max Gust (km/h)", 4);
			}
		});

		globalStats.forEach((element) => {
			if (element["Valeur maximale"] == -Infinity) {
				element["Valeur maximale"] = "Non disponible";
			}
			if (element["Valeur minimale"] == Infinity) {
				element["Valeur minimale"] = "Non disponible";
			}
		});

		return globalStats;
	}

	/**
	 *
	 * @returns Retourne l'entête des statistiques globales.
	 */
	static getGlobalStatisticsHeader() {
		return ["Donnée", "Valeur maximale", "Année", "Mois", "Valeur minimale", "Année", "Mois"];
	}

	static getMonthlyStatisticsTemplate() {
		return [
			{
				Donnée: "Température moyenne mensuelle (°C)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Valeur minimale": Infinity,
				"Année min": ""
			},
			{
				Donnée: "Température extrême (°C)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Valeur minimale": Infinity,
				"Année min": ""
			},
			{
				Donnée: "Quantité de pluie (cm)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Valeur minimale": Infinity,
				"Année min": ""
			},
			{
				Donnée: "Quantité de neige (cm)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Valeur minimale": Infinity,
				"Année min": ""
			},
			{
				Donnée: "Vitesse du vent (km/h)",
				"Valeur maximale": -Infinity,
				"Année max": "",
				"Valeur minimale": Infinity,
				"Année min": ""
			}
		];
	}

	/**
	 *
	 * @param {number} fromDate Date indiquant le début de la période voulue.
	 * @param {number} toDate Date indiquant la fin de la période voulue.
	 * @returns Retourne les maximums et les minimums de certaines données pour la période voulue.
	 */
	static getMonthlyStatistics(fromDate, toDate) {
		let monthlyStats = [];
		for (let i = 0; i < DateUtils.monthNumer; i++) {
			monthlyStats.push(this.getMonthlyStatisticsTemplate());
		}

		/**
		 *
		 * @param {any} element Objet représentant un instantané de station.
		 * @param {string} minEntry Variable de minimum.
		 * @param {string} maxEntry Variable de maximum.
		 * @param {any} globalStatsRef Référence d'un objet de statistique globale.
		 * @param {string} variable Variable de la statistique globale.
		 */
		let setMinMaxValues = function (element, maxEntry, minEntry, variable) {
			Assert.type(minEntry, "string", "minEntry");
			Assert.type(maxEntry, "string", "maxEntry");
			Assert.type(variable, "number", "variable");

			let minVal = Number.parseFloat(element[minEntry]);
			let maxVal = Number.parseFloat(element[maxEntry]);
			let _month = Number.parseInt(element["Month"]);
			let slStat = monthlyStats[_month - 1];
			let curObj = slStat[variable];
			let curMax = curObj["Valeur maximale"];
			let curMin = curObj["Valeur minimale"];
			if (isNaN(minVal) || isNaN(maxVal)) {
				return;
			}

			// algorithme pour trouver la moyenne de la donnée
			let avgVal = (minVal + maxVal) / 2.0;

			if (curMax <= avgVal) {
				curObj["Valeur maximale"] = avgVal.toFixed(2);
				curObj["Année max"] = element["Year"];
			}
			if (curMin >= avgVal) {
				curObj["Valeur minimale"] = avgVal.toFixed(2);
				curObj["Année min"] = element["Year"];
			}
		};

		this.stationMetrics.forEach((element) => {
			let year = Number.parseInt(element["Year"]);
			let month = Number.parseInt(element["Month"]);

			let elementDate = DateUtils.getFormatedDate(year, month);
			if (elementDate >= fromDate && elementDate <= toDate) {
				setMinMaxValues(element, "Mean Max Temp (°C)", "Mean Min Temp (°C)", 0);
				setMinMaxValues(element, "Extr Max Temp (°C)", "Extr Min Temp (°C)", 1);
				setMinMaxValues(element, "Total Rain (mm)", "Total Rain (mm)", 2);
				setMinMaxValues(element, "Total Snow (cm)", "Total Snow (cm)", 3);
				setMinMaxValues(element, "Spd of Max Gust (km/h)", "Spd of Max Gust (km/h)", 4);
			}
		});

		for (let i = 0; i < monthlyStats.length; i++) {
			monthlyStats[i].forEach((element) => {
				if (element["Valeur maximale"] == -Infinity) {
					element["Valeur maximale"] = "Non disponible";
				}
				if (element["Valeur minimale"] == Infinity) {
					element["Valeur minimale"] = "Non disponible";
				}
			});
		}

		return monthlyStats;
	}

	/**
	 *
	 * @returns Retourne l'entête des statistiques globales.
	 */
	static getMonthlyStatisticsHeader() {
		return ["Donnée", "Valeur maximale", "Année", "Valeur minimale", "Année"];
	}
}
