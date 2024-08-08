import fs from 'node:fs';
import { ObjParser } from '../utility/Parser.js'

export class StationInventory {
	static #inventory = [];

	static load() {
		let inventoryStr = fs.readFileSync("./data/Station Inventory EN.csv").toString();
		let obj = ObjParser.parse(inventoryStr);
		let rows = ObjParser.csvToObj(obj, 2);
		
		for(let i = 0; i < rows.length; i++) {
			let id = rows[i]["Station ID"];
			this.#inventory[id] = rows[i];
		}
	}

	static getInfoFromID(id) {
		let stringID = `${id}`;
		let result = this.#inventory[stringID];
		if(result == undefined) 
			return null;
		return result;
	}
}