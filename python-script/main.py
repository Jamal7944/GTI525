import datetime, os, pymongo, json, csv

CWD = os.getcwd()
CSV_LOC = os.path.join(CWD, 'Lab1_CSV')
# CSV_LOC = os.path.join(CWD, 'python-script', 'Lab1_CSV')
STATION_HEADER = ["name","province","climate_id","_id","wmo_id","tc_id","lat_deg","long_deg","lat","long","elevation","f_year","l_year","hly_f_year","hly_l_year","dly_f_year","dly_l_year","mly_f_year","mly_l_year"]
INFO_HEADER = ["long","lat","station_name","climate_id","datetime","year","month","mean_max_temp","mean_max_temp_flag","mean_min_temp","mean_min_temp_flag","mean_temp","mean_temp_flag","extr_max_temp","extr_max_temp_flag","extr_min_temp","extr_min_temp_flag","total_rain","total_rain_flag","total_snow","total_snow_flag","total_precip","total_precip_flag","snow_grnd_l_day","snow_grnd_l_day_flag","dir_max_gust","dir_max_gust_flag","spd_max_gust","spd_max_gust_flag"]

def loopOverFile(filename):
    if os.path.isfile(filename):
        f2 = open(filename, encoding='utf-8')
        header = None
        retArr = []
        i = 0
        for rows in f2:
            if i == 0:
                header = rows
            else:
                entry = rows.replace('"','').replace('\n','').split(',')
                dictEntry = {}
                for x in range(len(INFO_HEADER)):
                    dictEntry[INFO_HEADER[x]] = entry[x] if entry[x] != '' else None
                retArr.append(dictEntry)
            i = i + 1
        f2.close()
        return retArr
    else:
        return None

def checkStation(mongodb):
    placeFile = os.path.join(CSV_LOC, 'Station Inventory EN.csv.js')
    data = []
    f = open(placeFile, encoding='utf-8')
    header = None
    i = 0
    for rows in f:
        if i == 0:
            header = rows
        else:
            entry = rows.replace('"','').replace('\n','').split(',')
            dictEntry = {}
            for x in range(len(STATION_HEADER)):
                dictEntry[STATION_HEADER[x]] = entry[x] if entry[x] != '' else None
            dataEntry = loopOverFile(os.path.join(CSV_LOC, f'{entry[3]}.csv'))
            if dataEntry:
                    col_historique = mongodb['historiques']
                    col_historique.insert_many(dataEntry)
            data.append(dictEntry)
        i = i + 1
    collections = mongodb['stations']
    collections.insert_many(data)
    f.close()

def saveFile(filename, msg):
    '''
    from : 
        - https://www.w3schools.com/python/python_file_write.asp
        - https://docs.python.org/3/library/os.path.html#os.path.isfile
    enregistre un fichier
    '''
    fn = os.path.join(CWD, filename)
    s = 'a' if os.path.isfile(fn) else 'w'
    f = open(fn, s)
    f.write(msg)
    f.close()

if __name__ == '__main__':
    start = datetime.datetime.now()
    try:
        myclient = pymongo.MongoClient("mongodb://localhost:27017/", username='admingr01eq04', password='VFvCLTfeb6qRd6')
        mydb = myclient["meteo"]
        dblist = myclient.list_database_names()
        if "meteo" in dblist:
            saveFile(f'log_{start:%Y%m%d}.log',f'{datetime.datetime.now():%Y%m%d__%H%M}:database already exists.\n')
        else:
            checkStation(mydb)
    except Exception as e:
        saveFile(f'error_{datetime.datetime.now():%Y%m%d}.log', f'{datetime.datetime.now():%Y%m%d__%H%M}:{repr(e)}\n')
    finally:
        saveFile(f'log_{start:%Y%m%d}.log',f'{datetime.datetime.now():%Y%m%d__%H%M}:FINISH -- start at : {start:%Y%m%d__%H:%M} finish at : {datetime.datetime.now():%Y%m%d__%H:%M}\n')
