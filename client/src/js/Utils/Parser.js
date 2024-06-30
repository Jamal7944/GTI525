import {Assert} from "./Assert";

export class ObjParser {
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
			if (response.ok) {
				const text = await response.text();
				data = text;
			} else {
				throw new Error("'" + filename + "' was not found.");
			}
		} catch (ex) {
			console.log(ex);
			return null;
		}

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
				if (data[i] != ",") {
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
	static async csvToObj(filename, startsAt) {
		Assert.type(startsAt, "number", "startsAt");

		let obj = [];
		let v = await this.parse(filename);

		if (v == null) {
			return;
		}

		let headers = v[startsAt];

		for (let i = startsAt + 1; i < v.length; i++) {
			let objRow = [];

			if (v[i].length == headers.length) {
				for (let j = 0; j < headers.length; j++) {
					objRow[headers[j]] = v[i][j];
				}

				obj.push(objRow);
			} else {
				console.log("skipped '" + v[i] + "'.");
			}
		}

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
		return obj;
	}
}
