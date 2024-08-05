import { MongoClient } from 'mongodb';

const url = 'mongodb://admingr01eq04:VFvCLTfeb6qRd6@localhost:27017/';
const dbName = 'meteo';
const cacheForecast = 'cacheCollectionForecast';
const cacheForecastHourly = 'cacheCollectionForecastHourly';

let client= new MongoClient(url);;
let database;
let forecastCollection;
let forecastHourlyCollection;

async function connectForecast() {
    try {
        database =client.db(dbName);
        forecastCollection = database.collection(cacheForecast);
        forecastCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 });

    }catch{
        console.log("error");
    }
    return forecastCollection;
}

async function connectForecastHourly() {
    try {
        database =client.db(dbName);
        forecastHourlyCollection= database.collection(cacheForecastHourly);
        forecastHourlyCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

    }catch{
        console.log("error");
    }
    return forecastHourlyCollection;
}

async function setUpTTLIndexes() {
    const { forecastCollection, forecastHourlyCollection } = await connect();
    await forecastCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 5 minutes TTL
    await forecastHourlyCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // 1 hour TTL
    console.log('TTL indexes created');
}

export { connectForecast,connectForecastHourly, setUpTTLIndexes };
