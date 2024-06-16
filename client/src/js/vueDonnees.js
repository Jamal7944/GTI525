
/**
 * [à supprimer, déplacé dans StationSnapshotView]
 */
export class vueDonnees {

    year;                      // TYPE: string
    month;                       // TYPE: string
    temp_Mean_Max;              // TYPE: float
    temp_Mean_Min;              // TYPE: float
    temp_Mean;                  // TYPE: float
    temp_Max;                   // TYPE: float
    temp_Min;                   // TYPE: float
    rain;                       // TYPE: float
    snow;                       // TYPE: float
    wind_speed_max;             // TYPE: float

    constructor(entries) {
        console.log(entries.length);

        if(entries.length != 10) {
            throw new Error("Array did not have 10 entries. [" + entries.length + "]");
        }

        this.year = entries[0];
        this.month = entries[1];
        this.temp_Mean_Max = entries[2];
        this.temp_Mean_Min = entries[3]; 
        this.temp_Mean = entries[4];
        this.temp_Max = entries[5];
        this.temp_Min = entries[6];
        this.rain = entries[7];
        this.snow = entries[8];
        this.wind_speed_max = entries[9];
    }
}