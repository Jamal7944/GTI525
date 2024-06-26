import { Logger } from "./Logger.js";
import { Result } from "./Result.js"

export class ObjParser {
	/**
	 * Parse un fichier .csv
	 * @param {string} filename Nom du fichier .csv
	 * @returns un tableau contenant toutes les rangées parsées. 
	 */
	static parse(data) {
		let values = [];
		let row = [];
		let i = 0;

		while (i < data.length) {
			if (data[i] == '"') {
				i++;
				let value = "";
				while (i < data.length && data[i] != '"') {
					value += data[i];
					i++;
				}

				i++;
				row.push(value);
				if (data[i] != ',') {
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
	 * @param {Array} data objet représentant le fichier csv parsé.
	 * @param {number} startsAt Rangée à laquelle la construction de l'objet commence. La première rangée analysée devrait être les headers.
	 * @returns Un tableau d'objet correspondant aux headers du fichier .csv ainsi que les valeurs y correspondant.
	 */
	static csvToObj(data, startsAt) {
		let log = new Logger("Parser", "csvToObj");
		if (typeof startsAt != "number") {
			log.error("startsAt was not a number");
			return [];
		}

		if(!(data instanceof Array)) {
			log.error("expected data to be an Array of CSV rows");
			return [];
		}

		if(data.length() == 0) {
			log.warning("expected data to have rows (data.length() returned 0)");
			return [];
		}

		let obj = [];
		let headers = data[startsAt];

		for (let i = startsAt + 1; i < data.length; i++) {
			let objRow = [];

			if (data[i].length == headers.length) {
				for (let j = 0; j < headers.length; j++) {
					objRow[headers[j]] = data[i][j];
				}

				obj.push(objRow);
			}
			else {
				console.log("skipped '" + data[i] + "'.");
			}
		}

		return obj;

		/*
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

		*/
	}
}