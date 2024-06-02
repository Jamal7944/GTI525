export class StationInfo {
    name;
    province;
    climateID;
    stationID;
    WMOID;
    TCID;
    latitudeDD;
    longitudeDD;
    latitude;
    longitude;
    elevation;
    firstYear;
    lastYear;
    HLYFirstYear;
    HLYLastYear;
    DLYFirstYear;
    DLYLastYear;
    MLYFirstYear;
    MLYLastYear;

    constructor(entries) {
        if(entries.length != 19) {
            console.log(entries);
            throw new Error("Array did not have 19 entries. [" + entries.length + "]");
        }

        this.name = entries[0];
        this.province = entries[1];
        this.climateID = entries[2];
        this.stationID = entries[3];
        this.WMOID = entries[4];
        this.TCID = entries[5];
        this.latitudeDD = entries[6];
        this.longitudeDD = entries[7];
        this.latitude = entries[8];
        this.longitude = entries[9];
        this.elevation = entries[10];
        this.firstYear = entries[11];
        this.lastYear = entries[12];
        this.HLYFirstYear = entries[13];
        this.HLYLastYear = entries[14];
        this.DLYFirstYear = entries[15];
        this.DLYLastYear = entries[16];
        this.MLYFirstYear = entries[17];
        this.MLYLastYear = entries[18];
    }
}