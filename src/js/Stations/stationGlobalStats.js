export class StationGlobalStats {
    entryName;     // string
    maxValue;      // float
    maxValueYear;  // int
    maxValueMonth  // int
    minValue;      // float
    minValueYear;  // int
    minValueMonth  // int 

    constructor(entries) {
        if(entries.length != 7) {
            throw new Error("Array did not have 7 entries. [" + entries.length + "]");
        }

        this.entryName = entries[0];
        this.maxValue = entries[1];
        this.maxValueYear = entries[2];
        this.maxValueMonth = entries[3];
        this.minValue = entries[4];
        this.minValueYear = entries[5];
        this.minValueMonth = entries[6];
    }

    static getEntryTypes() {
        return [
            "Température moyenne mensuelle",
            "Température extrême",
            "Qtée de pluie",
            "Qtée de neige", 
            "Vitesse du vent"
        ]
    }

    static getHeaders() {
        return [
            "Donnée",
            "Valeur max.",
            "Année",
            "Mois",
            "Valeur min.", 
            "Année",
            "Mois"
        ];
    }
}