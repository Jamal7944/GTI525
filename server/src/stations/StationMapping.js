import fs from "fs";
import { Logger } from "../utility/Logger.js";
import { Result } from "../utility/Result.js";
import { StationInventory } from "./StationInventory.js";

/**
 * Classe liant un code d'aéroport à des codes de stationID ainsi qu'à un flux RSS.
 */
export class StationMapping {
    /**
     * Contenu du JSON "station_mapping.json".
     */
    static #mapping = {};

    /**
     * Amorce le chargement du fichier "station_mapping.json".
     */
    static load() {
        this.#mapping = JSON.parse(fs.readFileSync("./data/station_mapping.json"));
    }

    /**
     * @param {string} code Obtient une entrée selon le code de l'aéroport. 
     * @returns Retourne un résultat, indiquant si l'opération est réussie ou non,
     * ainsi que la valeur de retour.
     */
    static getFromCode(code) {
        const log = new Logger("StationMapping", "getFromCode");

        if (typeof code != "string") {
            log.error("code was not a string");
            return Result.failed();
        }

        let stationInfo = this.#mapping[code];
        if (stationInfo == undefined) {
            log.error("code was not valid");
            return Result.failed();
        }

        return Result.success(stationInfo);
    }

    /**
     * 
     * @param {number} id Obtient une entrée selon le stationID de l'aéroport.
     * @returns Retourne un résultat, indiquant si l'opération est réussie ou non,
     * ainsi que la valeur de retour.
     */
    static getFromID(id) {
        let log = new Logger("StationMapping", "getFromID");

        if (typeof (id) != "number") {
            log.error("id was not a number");
            return Result.failed();
        }

        let keys = Object.keys(this.#mapping);
        for (let i = 0; i < keys.length; i++) {
            let info = this.#mapping[keys[i]];
            let listOfIDs = Array.from(info["station_ids"]);
            if (listOfIDs.includes(id)) {
                return Result.success(info);
            }
        }

        log.error("id " + id + " not found");
        return Result.failed();
    }

	/**
	 * 
	 * @returns Retourne un tableau contenant un id pour chaque station.
	 */
	static getStationIDs() {
		let log = new Logger("StationMapping", "getStationIDs");
		let arr = [];
		for(let key in this.#mapping)
			arr.push(this.#mapping[key]["station_ids"][0]);
		return arr;
	}
}

