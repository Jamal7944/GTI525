export class Logger {
	#func;
	
	constructor(className, functionName) {
		this.#func = className + "." + functionName;
	}

	error(message) {
		console.log("[ERROR] in " + this.#func + "(...):");
		console.log("[ERROR] \"" + message + "\"");
	}

	warning(message) {
		console.log("[WARNING] in " + this.#func + "(...):");
		console.log("[WARNING] \"" + message + "\"");
	}
}