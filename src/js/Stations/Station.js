import { Assert } from "./Assert";

export class Station {

    static stationInventory = [];
    static stationMetrics = [];

    /**
     * Parse un fichier .csv
     * @param {string} filename Nom du fichier .csv
     * @returns un tableau contenant toutes les rangées parsées. 
     */
    static async parse(filename) {
        Assert.type(filename, "string", "filename");

        let data; 
        try { 
            const response = await fetch(filename);
            if(response.ok) {
                const text = await response.text();
                data = text;
            }
            else {
                throw new Error("'" + filename + "' was not found.");
            }
        }
        catch(ex) {
            console.log(ex);
            return null;
        }

        let values = [];
        let row = [];
        let i = 0;

        while( i < data.length) {
            if(data[i] == '"') {
                i++;
                let value = "";
                while(i < data.length && data[i] != '"') {
                    value += data[i];
                    i++;
                }

                i++;
                row.push(value);
                if(data[i] != ',') {
                    //console.log(row);
                    values.push(row);
                    row = [];
                }
            }

            i++;
        }

        return values;
    }

    /**
     * Traduit les données parsées du fichier CSV en objets javascript.
     * @param {string} filename Nom du fichier .csv 
     * @param {number} startsAt Rangée à laquelle la construction de l'objet commence. La première rangée analysée devrait être les headers.
     * @returns Un tableau d'objet correspondant aux headers du fichier .csv ainsi que les valeurs y correspondant.
     */
    static csvToObj(filename, startsAt) {
        Assert.type(startsAt, "number", "startsAt");

        let obj = [];
        this.parse(filename).then((v) => {
            if(v == null) {
                return; 
            }
    
            let headers = v[startsAt];
    
            for(let i = startsAt + 1; i < v.length; i++) {
                let objRow = [];
    
                if(v[i].length == headers.length) {
                    for(let j = 0; j < headers.length; j++) {
                        objRow[headers[j]] = v[i][j];
                    }
    
                    obj.push(objRow);
                }
                else {
                    console.log("skipped '" + v[i] + "'.");
                }
            }
        })

        console.log("end");
        return obj;
    }

    /**
     * Charges l'inventaire de station météo.
     */
    static loadStationInventory() {
        let filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv"
        let result = this.csvToObj(filename, 2);
        this.stationInventory = result;
    }

    /**
     * Charges les métriques d'une station météo.
     * @param {number} stationID L'identifiant unique de la station météo. 
     */
    static loadStationMetrics(stationID) {
        Assert.type(stationID, "number", "stationID");

        let filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + stationID + ".csv";
        let result = this.csvToObj(filename, 0);
        this.stationMetrics = result; 
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

            let elementDate = this.getFormatedDate(year, month);
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
     * Obtient un identifiant de date.
     * @param {number} year Année
     * @param {number} month Mois 
     */
    static getFormatedDate(year, month) {
        Assert.type(year, "number", "year");
        Assert.type(month, "number", "month");

        let date = year * 100 + month;
        return date;
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

    static getMonths() {
        return [
            "Janvier", 
            "Fevrier", 
            "Mars", 
            "Avril", 
            "Mai", 
            "Juin", 
            "Juillet", 
            "Aout", 
            "Septembre", 
            "Octobre", 
            "Novembre", 
            "Decembre"
        ];
    }

    static generateHTML(headers, content) {
        let html = "";
        html += "<table>";
        html += "<tr>"; 
        for(let i = 0; i < headers.length; i++) {
            html += "<th>" + headers[i] + "</th>";
        }
        html += "</tr>";
        for(let i = 0; i < content.length; i++) {
            html += "<tr>";
            for(let key in content[i]) {
                html += "<td>" + content[i][key] + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        return html;
    }
}