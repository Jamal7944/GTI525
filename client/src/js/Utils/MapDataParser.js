export class MapDataParser {
	static #conditionIndex = 4;
	static #forecastArrayIndex = 5;
	static #alertIndex = 3;
	static #tempIndex = 0;
	static #detailIndex = 1;
	static #arrayOfDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

	static #displayedRegex = new RegExp("(Ce|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)( soir et nuit| soir et cette nuit|)");
	static #currentTempRegex = new RegExp("[0-9]+(,|)[0-9]+°C");
	static #forecastRegex = new RegExp("(Maximum|Minimum|Températures stables près de) [0-9]+");

	static #makeMapDataObject(displayed, day, moment, temperature, details) {
		return {
			displayed: displayed,
			day: day,
			moment: moment,
			temperature: temperature,
			details: details
		};
	}

	static parse(jsObject) {
		let result = [];
		let arr = jsObject[this.#forecastArrayIndex];

		// on parse avec un regex le jour et le moment de la journée
		// ex: "Samedi soir et nuit"
		let parsedDisplayed = "Actuellement";

		// les premières entrées repréesentent les données actuelles, et
		// ne contiennent pas le jour, juste la date. 
		let day = "Actuellement";

		// Pour le moment de la journée, on vérifie si le moment présent
		// est entre 20h et 6h et si vrai, on y attribue le moment "nuit".
		let now = new Date(Date.now());
		let moment = (now.getHours() >= 20 || now.getHours() < 6) ? "nuit" : "jour";

		// on parse la température du string de conditions/prévisions.
		// ex: "Samedi: Généralement ensoleillé. Maximum 28 sauf 22 là où les vents soufflent du large."
		// va nous donner "28".
		let temperature = jsObject[this.#conditionIndex];
		let parsedTemperature = this.#currentTempRegex.exec(temperature)[0];

		// pour les détails de la condition actuelle, on prend l'alerte.
		let alert = "";
		for (let i = 0; i < jsObject[this.#alertIndex].length; i++) {
			alert += jsObject[this.#alertIndex] + '\n';
		}
		alert += temperature;

		// on ajoute l'objet 'mapdata' à la collection
		result.push(this.#makeMapDataObject(parsedDisplayed, day, moment, parsedTemperature, alert));
		let currentDate = new Date();
		let dayOfWeek = currentDate.getDay();

		for (let i = 0; i < arr.length; i++) {
			let selected = arr[i];
			let displayed = selected[this.#tempIndex];
			let displayedRegexResult = this.#displayedRegex.exec(displayed);

			// texte à afficher
			let parsedDisplayed;
			parsedDisplayed = displayedRegexResult[0];

			// jour
			let day = displayedRegexResult[1];
			
			// correction d'un bug où certaines provinces avait une entrée pour la température actuelle 
			// ET une entrée pour la prévision plus tard dans la même journée. Cela faisait un décalage 
			// dans la sélection des prévisions et la carte affichait pour la moitié des stations des 
			// prévisions de nuit alors que l'autre moitié étaient des prévisions de jour. 
			if(day == this.#arrayOfDays[dayOfWeek]) {
				continue;
			}

			// moment
			let moment = (parsedDisplayed.includes("nuit", 0)) ? "nuit" : "jour";
			//console.log(parsedDisplayed);
			//console.log(moment);

			let temperature = "";
			try {
			// temperature
				temperature = this.#forecastRegex.exec(displayed)[0].split(" ")[1] + "°C";
			}
			catch(e) {
				console.log(displayed);
				console.log(arr[i]);
			}


			// details
			let details = selected[this.#detailIndex];

			result.push(this.#makeMapDataObject(parsedDisplayed, day, moment, temperature, details));
		}
		return result;
	}
}