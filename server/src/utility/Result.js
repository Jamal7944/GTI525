/**
 * Classe utilitaire permettant d'indiquer si une opération a
 * réussi ou non, et d'y attaché une valeur de retour au besoin.
 */
export class Result {
	/** indique la réussite de l'opération */
	success = false; 
	/** valeur de retour */
	result = null;

	/**
	 * 
	 * @param {boolean} success indique la réussite de l'opération
	 * @param {any} result valeur de retour
	 */
	constructor(success, result) {
		this.success = success;
		this.result = result;
	}

	/**
	 * 
	 * @returns Retourne une instance de Result indiquant que l'opéation a échouée.
	 */
	static failed() {
		return new Result(false, null);
	}

	/**
	 * 
	 * @param {any} result valeur de retour
	 * @returns Retourne une instance de Result indiquant que l'opéation a échouée.
	 */
	static success(result) {
		return new Result(true, result);
	}
}