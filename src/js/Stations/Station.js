import { Assert } from "../Utils/Assert";
import { DateUtils } from "../Utils/Date";
import { ObjParser } from "../Utils/Parser";

export class Station {

    static stationInventory = [];
    static stationMetrics = [];

    /**
     * Charges l'inventaire de station météo.
     */
    static loadStationInventory(context, thenCallback) {
        let filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv"
        ObjParser.csvToObj(filename, 2).then((result) => {
            this.stationInventory = result;
            if(result.length == 0) 
                3
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
            if(result != undefined) 
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
            if(elementDate >= fromDate && elementDate <= toDate) {
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
                "Donnée": "Température moyenne mensuelle (°C)",
                "Valeur maximale": -Infinity,
                "Année max": "",
                "Mois max": "", 
                "Valeur minimale": Infinity,
                "Année min": "",
                "Mois min" : "",
            },
            {
                "Donnée": "Température extrême (°C)",
                "Valeur maximale": -Infinity,
                "Année max": "",
                "Mois max": "", 
                "Valeur minimale": Infinity,
                "Année min": "",
                "Mois min" : "",
            },
            {
                "Donnée": "Quantité de pluie (cm)",
                "Valeur maximale": -Infinity,
                "Année max": "",
                "Mois max": "", 
                "Valeur minimale": Infinity,
                "Année min": "",
                "Mois min" : "",
            },
            {
                "Donnée": "Quantité de neige (cm)",
                "Valeur maximale": -Infinity,
                "Année max": "",
                "Mois max": "", 
                "Valeur minimale": Infinity,
                "Année min": "",
                "Mois min" : "",
            },
            {
                "Donnée": "Vitesse du vent (km/h)",
                "Valeur maximale": -Infinity,
                "Année max": "",
                "Mois max": "", 
                "Valeur minimale": Infinity,
                "Année min": "",
                "Mois min" : "",
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
        let setMinMaxValues = function(element, minEntry, maxEntry, variable) {
            Assert.type(minEntry, "string", "minEntry");
            Assert.type(maxEntry, "string", "maxEntry");
            Assert.type(variable, "number", "variable");
            
            let minVal = Number.parseFloat(element[minEntry]);
            let maxVal = Number.parseFloat(element[maxEntry]);
            let curObj = globalStats[variable];
            let curMax = curObj["Valeur maximale"];
            let curMin = curObj["Valeur minimale"];
    
            if(curMax < maxVal) {
                curObj["Valeur maximale"] = maxVal;
                curObj["Année max"] = element["Year"];
                curObj["Mois max"] = element["Month"];
            }
            if(curMin > minVal) {
                curObj["Valeur minimale"] = minVal;
                curObj["Année min"] = element["Year"];
                curObj["Mois min"] = element["Month"];
            }
        }

        this.stationMetrics.forEach((element) => {
            let year = Number.parseInt(element["Year"]);
            let month = Number.parseInt(element["Month"]);

            let elementDate = DateUtils.getFormatedDate(year, month);
            if(elementDate >= fromDate && elementDate <= toDate) {
                setMinMaxValues(element, "Mean Max Temp (°C)", "Mean Min Temp (°C)", 0);
                setMinMaxValues(element, "Extr Max Temp (°C)", "Extr Min Temp (°C)", 1);
                setMinMaxValues(element, "Total Rain (mm)", "Total Rain (mm)", 2);
                setMinMaxValues(element, "Total Snow (cm)", "Total Snow (cm)", 3);
                setMinMaxValues(element, "Spd of Max Gust (km/h)", "Spd of Max Gust (km/h)", 4);
            }
        });
        
        return globalStats;
    }

    /**
     * 
     * @returns Retourne l'entête des statistiques globales.
     */
    static getGlobalStatisticsHeader() {
        return [
            "Donnée",
            "Valeur maximale",
            "Année",
            "Mois",
            "Valeur minimale",
            "Année",
            "Mois"
        ];
    }
}