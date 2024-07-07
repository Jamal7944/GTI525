export class ParagraphUtils {
	static generateParagraph(header, content) {
		let html = "";
		for (let i = 0; i < content[0].length; i++) {
			html += "<p class=\"paragraph-forecast\"><span class=\"span-forecast\">" + header[i] + ":</span> " + content[0][i] + "</p>";
		}
		return html;
	}
	static generateParagraphWithTitle(title, header, content) {
		let html = "";
		html += "<h2>" + title + "</h2>";
		html += "<p class=\"paragraph-forecast\"><span class=\"span-forecast\">" + header[0] + ":</span> " + content[0][0] + " ( " + header[1] + ": <a href=" + content[0][1] + ">" + content[0][1] + "</a>" + " )</p>"
		for (let i = 2; i < content[0].length - 1; i++) {
			html += "<p class=\"paragraph-forecast\"><span class=\"span-forecast\">" + header[i] + ":</span> " + content[0][i] + "</p>";
		}
		let x = content[0].length - 1;
		html += "<p class=\"paragraph-forecast\"><span class=\"span-forecast\">" + header[x] + ":</span> <br>";
		for (let y = 0; y < content[0][x].length; y++) {
			html += "<span class=\"span-forecast\">Condition: </span>" + content[0][x][y][0] + "<br> <span class=\"span-forecast\">Détails: </span>" + content[0][x][y][1] + "</br></br>";
		}
		html += "</p>";
		return html;
	}

	static generateError() {
		return "<p>Données non disponible.</p><br>";
	}
}