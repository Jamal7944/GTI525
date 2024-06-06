/**
 * T4.1 - Représente les données pertinentes à afficher.
 */
export class StationSnapshotView {
    year;                       // TYPE: string
    month;                      // TYPE: string
    tempMeanMax;                // TYPE: float
    tempMeanMin;                // TYPE: float
    tempAverage;                // TYPE: float
    tempMax;                    // TYPE: float
    tempMin;                    // TYPE: float
    rain;                       // TYPE: float
    snow;                       // TYPE: float
    windSpeedMax;               // TYPE: float
 
    constructor(entries) {
        //console.log(entries.length);

        if(entries.length != 10) {
            throw new Error("Array did not have 10 entries. [" + entries.length + "]");
        }

        this.year = entries[0];
        this.month = entries[1];
        this.tempMeanMax = entries[2];
        this.tempMeanMin = entries[3]; 
        this.tempAverage = entries[4];
        this.tempMax = entries[5];
        this.tempMin = entries[6];
        this.rain = entries[7];
        this.snow = entries[8];
        this.windSpeedMax = entries[9];
    }

    static getHeaders() {
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