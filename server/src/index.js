import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import loadRoutes from './routes.js';
import { StationMapping } from "./stations/StationMapping.js"
import { StationInventory } from './stations/StationInventory.js';

const app = express();
const port = 8081;

app.use(express.json());
//app.use('/', router);
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("../client/dist"));

loadRoutes(app);

app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur le port ${port}`);
	StationMapping.load();
	StationInventory.load();
});