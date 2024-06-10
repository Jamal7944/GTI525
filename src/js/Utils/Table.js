export class TableUtils {

	/**
	 * 
	 * @param {any} headers Tableau de string contenant les entêtes
	 * @param {any} content Tableau de tableau de string contenant les valeurs de la table.
	 * @returns Retourne un string représentant une table HTML avec le contenu spécifié.
	 */
	static generateHTML(headers, content) {
        let html = "";
        html += "<table>";
        html += "<tr>"; 
        for(let i = 0; i < headers.length; i++) {
            html += "<th>" + headers[i] + "</th>";
        }
        html += "</tr>";
        for(let i = 0; i < content.length; i++) {
            html += "<tr>";
            for(let key in content[i]) {
                html += "<td>" + content[i][key] + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        return html;
    }

    /** 
    * @param {any} title Titre du tableau
    * @param {any} headers Tableau de string contenant les entêtes
    * @param {any} content Tableau de tableau de string contenant les valeurs de la table.
    * @returns Retourne un string représentant une table HTML avec le contenu spécifié.
    */
   static generateHTMLWithTitle(title, headers, content) {
       let html = "";
       html += "<h2>" + title + "</h2><br>";
       html += "<table>";
       html += "<tr>"; 
       for(let i = 0; i < headers.length; i++) {
           html += "<th>" + headers[i] + "</th>";
       }
       html += "</tr>";
       for(let i = 0; i < content.length; i++) {
           html += "<tr>";
           for(let key in content[i]) {
               html += "<td>" + content[i][key] + "</td>";
           }
           html += "</tr>";
       }
       html += "</table><br>";
       return html;
   }
}