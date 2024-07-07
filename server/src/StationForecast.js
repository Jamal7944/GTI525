import { Logger } from "./utility/Logger.js";
import {ObjParser} from "./utility/Parser.js"
import { Result } from "./utility/Result.js";
import fs from "fs";
import { DOMParser } from 'xmldom';

export class StationForecast{
    static async getForecast(stationID){
        let resultArr = [];
        let jsonFile = JSON.parse(fs.readFileSync("./data/station_mapping.json"));
        let url = null;



        for (const key in jsonFile) {
            if (jsonFile[key].station_ids.includes(stationID)) {
                url = jsonFile[key].rss_feed;
                break;
            }
        }
        
		if (url) {
            await fetch(url)
                    .then(response => response.text())
                    .then(str => {
                        let parser = new DOMParser();
                        let xmlDoc = parser.parseFromString(str, "application/xml");
                        
                        let itemTitle = xmlDoc.getElementsByTagName("title")[0].textContent;
                        let link = xmlDoc.getElementsByTagName("link")[0]
                        let href="";
                        if (link) { 
                            href = link.getAttribute("href");
                        }
                        let itemUpdate = xmlDoc.getElementsByTagName("updated")[0].textContent;
            
                        let items = xmlDoc.getElementsByTagName("entry");
                        let forecastDetails =[];
                        let Alarm="";
                        let conditionActuel="";
                        for(let i = 0; i<items.length; i++){
                            let entry = items[i];
                            if(i==0){
                                Alarm = entry.getElementsByTagName("title")[0].textContent;
                                
                                
                            }
                            else if(i==1){
                                conditionActuel = entry.getElementsByTagName("title")[0].textContent;
                                
                            }
                            else{
                                forecastDetails.push([entry.getElementsByTagName("title")[0].textContent, 
                                entry.getElementsByTagName("summary")[0].textContent]);
                                
                            }

                        }
                        resultArr=[itemTitle, href, itemUpdate, Alarm, conditionActuel, forecastDetails];
                        
                    })
                    .catch(error => console.error('Error fetching the RSS feed:', error));
        } else {
            console.log('No RSS feed found for the given station ID.');
        }
        return resultArr;
    }

    
}