import {Assert} from "./Assert";

export class DateUtils {
	/**
	 * Obtient un identifiant de date.
	 * @param {number} year Année
	 * @param {number} month Mois
	 */
	static getFormatedDate(year, month) {
		Assert.type(year, "number", "year");
		Assert.type(month, "number", "month");

		let date = year * 100 + month;
		return date;
	}

	/**
	 *
	 * @returns Retourne un tableau contenant les mois de l'année
	 */
	static getMonths() {
		return ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
	}

	/**
	 *
	 * @param {number} from Année de début
	 * @param {number} to Année de fin
	 * @returns Retourne un tableau avec toutes les années entre celles spécifiées.
	 */
	static getYears(from, to) {
		Assert.type(from, "number", "from");
		Assert.type(to, "number", "to");

		let years = [];
		for (let i = from; i < to; i++) {
			years.push(i);
		}
		return years;
	}

	/** Le nombre de mois par année. */
	static monthNumer = 12;
}
