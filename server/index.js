import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from  './routes/apiRoutes.js'

const app = express();

app.use(express.json());
app.use('/api',apiRoutes)
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("../client/dist"));
const port = 8081
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
