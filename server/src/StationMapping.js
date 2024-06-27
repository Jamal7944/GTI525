import fs from "fs";
import { Logger } from "./utility/Logger.js";
import { Result } from "./utility/Result.js";

export class StationMapping {
	static #mapping = {};

	static load() {
		this.#mapping = JSON.parse(fs.readFileSync("./../data/station_mapping.json"));
	}

	static getFromCode(code) {
		const log = new Logger("StationMapping", "getFromCode");

		if(typeof code != "string") {
			log.error("code was not a string");
			return Result.failed();
		}

		let stationInfo = this.#mapping[code];
		if(stationInfo == undefined) {
			log.error("code was not valid");
			return Result.failed();
		}

		return new Result(true, stationInfo);
	}

	static getFromID(id) {
		let log = new Logger("StationMapping", "getFromID");

		if(typeof(id) != "number") {
			log.error("id was not a number");
			return Result.failed();
		}

		let keys = Object.keys(this.#mapping);
		for(const key in keys) {
			let info = this.#mapping[key];
			let listOfIDs = Array.from(info["station_ids"]);
			for(const stationID in listOfIDs) {
				if(stationID == id) {
					return new Result(true, info);
				}
			}
		}

		log.error("id not found");
		return Result.failed();
	}
}

