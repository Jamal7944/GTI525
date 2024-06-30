export class TableUtils {
	/**
	 *
	 * @param {any} headers Tableau de string contenant les entêtes
	 * @param {any} content Tableau de tableau de string contenant les valeurs de la table.
	 * @returns Retourne un string représentant une table HTML avec le contenu spécifié.
	 */
	static generateHTML(headers, content) {
		let html = "";
		html += '<table class="table table-striped  table-hover">';
		html += "<tr>";
		for (let i = 0; i < headers.length; i++) {
			html += "<th>" + headers[i] + "</th>";
		}
		html += "</tr>";
		for (let i = 0; i < content.length; i++) {
			html += "<tr>";
			for (let key in content[i]) {
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
		html += '<table class="table table-striped  table-hover">';
		html += "<tr>";
		for (let i = 0; i < headers.length; i++) {
			html += "<th>" + headers[i] + "</th>";
		}
		html += "</tr>";
		for (let i = 0; i < content.length; i++) {
			html += "<tr>";
			for (let key in content[i]) {
				html += "<td>" + content[i][key] + "</td>";
			}
			html += "</tr>";
		}
		html += "</table><br>";
		return html;
	}

	static generateNotAvailable() {
		return "<p>Données non disponible.</p><br>";
	}

	static generateNotAvailableWithTitle(title) {
		let html = "";
		html += "<h2>" + title + "</h2><br>";
		html += "<p>Données non disponible.</p><br>";
		return html;
	}

	static generateError(errorMessage) {
		return `<p>${errorMessage}</p>`;
	}
}
