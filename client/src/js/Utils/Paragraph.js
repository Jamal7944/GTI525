export class ParagraphUtils{
    static generateParagraph(header, content){
        let html="";
        for(let i=0; i<content[0].length; i++){
            html+="<p class=\"paragraph-forecast\"><span class=\"span-forecast\">"+header[i]+":</span> "+content[0][i]+"</p>";
        }
        return html;
    }
    static generateParagraphWithTitle(title, header, content){
        let html="";
        html+="<h2>"+title+"</h2>";
        for(let i=0; i<content[0].length-1; i++){
            html+="<p class=\"paragraph-forecast\"><span class=\"span-forecast\">"+header[i]+":</span> "+content[0][i]+"</p>";
        }
        let x =content[0].length-1;
        html+="<p class=\"paragraph-forecast\"><span class=\"span-forecast\">"+header[x]+":</span> <br>";
        for(let y=0;y<content[0][x].length;y++){
            html+="Titre: "+content[0][x][y][0]+", Sommaire: "+content[0][x][y][1] +"</br>";
        }
        html+="</p>";
        return html;
    }
}