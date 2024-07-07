import { StationMapping } from './stations/StationMapping.js';
import { StationPastHourlyForecast } from './stations/StationPastHourlyForecast.js';

export default function loadRoutes(app) {
	/**
 	* Route pour obtenir les données horaires d'une journée passée.
 	*/
	app.post("/station/past-hourly-forecast", async (req, res) => {
		// on s'attend à recevoir: 
		// { stationID: ..., year: ..., month: ..., day: ... };
	
		let request = req.body;
		let stationID = Number.parseInt(request.stationID);
		let stationMapping = StationMapping.getFromID(stationID);
	
		if (stationMapping.success) {
			let station_ids = stationMapping.result.station_ids;
			let info = [];
			for (let i = 0; i < station_ids.length; i++) {
				if (info.length == 0) {
					let result = await StationPastHourlyForecast.getPastHourlyForecast(station_ids[i], request.year, request.month, request.day);
					info = result;
				}
			}
	
			res.json({
				info: info,
				header: StationPastHourlyForecast.getPastHourlyForecastHeader()
			});
		}
		else {
			res.json({
				info: [],
				header: StationPastHourlyForecast.getPastHourlyForecastHeader(),
			})
		}
	});

	
}
