/**
 * Classe affichant des messages de débuggage.
 */
export class Logger {
	/** le nom de la fonction dans laquelle l'instance Logger se trouve. */
	#func;
	
	/**
	 * 
	 * @param {string} className Nom de la classe
	 * @param {string} functionName Nom de la méthode
	 */
	constructor(className, functionName) {
		this.#func = className + "." + functionName;
	}

	/**
	 * 
	 * @param {string} message Message d'erreur à afficher
	 */
	error(message) {
		console.log("\x1b[91m[ERROR] in " + this.#func + "(...):");
		console.log("        \"" + message + "\"\x1b[0m");
	}

	/**
	 * 
	 * @param {string} message Message d'avertissement à afficher
	 */
	warning(message) {
		console.log("\x1b[33m[WARNING] in " + this.#func + "(...):");
		console.log("          \"" + message + "\"\x1b[0m");
	}

	/**
	 * 
	 * @param {*} message Message d'information à afficher
	 */
	info(message) {
		console.log("\x1b[94m[INFO] in " + this.#func + "(...):");
		console.log("       \"" + message + "\"\x1b[0m");
	}

	newline() {
		console.log(" ");
	}
}