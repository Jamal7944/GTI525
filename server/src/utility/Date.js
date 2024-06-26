import { Logger } from "./Logger.js";

export class DateUtils {
	static toDateID(year, month, day) {
		let log = new Logger("DateUtils", "toYYYYMMDD");

		let nYear = Number.parseInt(year);
		let nMonth = Number.parseInt(month);
		let nDay = Number.parseInt(day);

		if(nYear == NaN || nMonth == NaN|| nDay == NaN) {
			let date = {
				year: nYear,
				month: nMonth,
				day: nDay
			};

			log.error("year, month or day was NaN : " + JSON.stringify(date));
			return 0;
		}

		let result = nYear * 10000 + nMonth * 100 + nDay;
		return result;
	}
}