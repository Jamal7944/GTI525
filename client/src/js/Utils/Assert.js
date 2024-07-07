export class Assert {
	/**
	 * Assertion de type.
	 * @param {any} value Objet sur lequel on veut vérifier le type.
	 * @param {*} expectedType Type auquel on s'attend.
	 * @param {*} varName Nom de la variable vérifiée.
	 */
	static type(value, expectedType, varName) {
		if (typeof value != expectedType) {
			throw new Error("invalid type for parameter '" + varName + "'; expected '" + expectedType + "', but recieved '" + typeof startsAt + "'.");
		}
	}
}
