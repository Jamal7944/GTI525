export class StationData {
    longitude;                  // TYPE: float
    latitude;                   // TYPE: float
    stationName;                // TYPE: string
    climateID;                  // TYPE: int
    dateTime;                   // TYPE: string
    year;                       // TYPE: string
    month;                      // TYPE: string
    meanMaxTempCelcius;         // TYPE: float
    meanMaxTempFlag;            // TYPE: string
    meanMinTempCelcius;         // TYPE: float
    meanMinTempFlag;            // TYPE: string
    extrMaxTempCelcius;         // TYPE: float
    extrMaxTempFlag;            // TYPE: string
    extrMinTempCelcius;         // TYPE: float
    extrMinTempFlag;            // TYPE: string
    totalRainMillimeters;       // TYPE: float
    totalRainFlag;              // TYPE: string
    totalSnowCentimeters;       // TYPE: float
    totalSnowFlag;              // TYPE: string
    totalPrecipMillimeters;     // TYPE: float
    totalPrecipFlag;            // TYPE: string
    snowGrndLastDayCentimeters; // TYPE: float
    snowGrndLastDayFlag;        // TYPE: string
    dirOfMaxGust10sOfDeg;       // TYPE: float
    dirOfMaxGustFlag;           // TYPE: string
    spdOfMaxGustKmh;            // TYPE: float
    spdOfMaxGustKmhFlag;        // TYPE: string

    constructor(entries) {
        console.log(entries.length);

        if(entries.length != 29) {
            throw new Error("Array did not have 29 entries. [" + entries.length + "]");
        }

        this.longitude = parseFloat(entries[0]);
        this.latitude = parseFloat(entries[1]);
        this.stationName = entries[2];
        this.climateID = parseInt(entries[3]);
        this.dateTime = entries[4];
        this.year = entries[5];
        this.month = entries[6];
        this.meanMaxTempCelcius = parseFloat(entries[7]);
        this.meanMaxTempFlag = entries[8];
        this.meanMaxTempCelcius = parseFloat(entries[9]);
        this.meanMaxTempFlag = entries[10];
        this.meanMinTempCelcius = parseFloat(entries[11]);
        this.meanMinTempFlag = entries[12];
        this.extrMaxTempCelcius = parseFloat(entries[13]);
        this.extrMaxTempFlag = entries[14];
        this.extrMinTempCelcius = parseFloat(entries[15]);
        this.extrMinTempFlag = entries[16];
        this.totalRainMillimeters = parseFloat(entries[17]);
        this.totalRainFlag = entries[18];
        this.totalSnowCentimeters = parseFloat(entries[19]);
        this.totalSnowFlag = entries[20];
        this.totalPrecipMillimeters = parseFloat(entries[21]);
        this.totalPrecipFlag = entries[22];
        this.snowGrndLastDayCentimeters = parseFloat(entries[23]);
        this.snowGrndLastDayFlag = entries[24];
        this.dirOfMaxGust10sOfDeg = parseFloat(entries[25]);
        this.dirOfMaxGustFlag = entries[26];
        this.spdOfMaxGustKmh = parseFloat(entries[27]);
        this.spdOfMaxGustKmhFlag = entries[28];
    }
}