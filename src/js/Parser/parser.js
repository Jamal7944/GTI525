export class CsvParser {
    /**
     * Ouvres et parses un fichier CSV.
     * @param {string} filename Nom du fichier à parser.
     * @returns Retourne un tableau de rangées d'objets.
     */
    static async loadAndParse(filename) {
        let data; 
        try { 
            const response = await fetch(filename);
            const text = await response.text();
            data = text;
        }
        catch(ex) {
            console.log(ex);
            return null;
        }

        let values = [];
        let row = [];
        let i = 0;

        while( i < data.length) {
            if(data[i] == '"') {
                i++;
                let value = "";
                while(i < data.length && data[i] != '"') {
                    value += data[i];
                    i++;
                }

                i++;
                row.push(value);
                if(data[i] != ',') {
                    console.log(row);
                    values.push(row);
                    row = [];
                }
            }

            i++;
        }

        return values;
    }
}