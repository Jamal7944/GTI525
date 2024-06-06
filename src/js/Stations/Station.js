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
            thenCallback(context);
        });
    }

    /**
     * Charges les métriques d'une station météo.
     * @param {number} stationID L'identifiant unique de la station météo. 
     */
    static async loadStationMetrics(stationID, context, thenCallback) {
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
     * 
     * @param {*} fromDate 
     * @param {*} toDate 
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

    static getMetricsViewHeader() {
        return [
            "Années",
            "Mois", 
            "Temps Moyen Max (C)",
            "Temps Moyen Min (C)", 
            "Temps Moyen (C)", 
            "Temps Max Enregistré (C)",
            "Temps Min Enregistré (C)", 
            "Pluie(mm)", 
            "Neige(cm)", 
            "Vitesse du vent(km/h)"
        ];
    }
}