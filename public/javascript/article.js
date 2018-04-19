/* Filename: articles.js
 * Description: This file updates the articles page every 3 seconds, displaying all the articles
 * in the database.
 */

/* This function includes an initial call to loadArticles, and then
 * calls it every 3 seconds
 */
$(document).ready(function() {
    loadArticles();
    setInterval("loadArticles()",3000);
});

/* This function creates the xhttp request "/articles/displayArticles" and sends it to the server.
 * The response text is put into a div with id="articles"
 */
function loadArticles() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("articlePreview").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/article/displayArticles", true);
    xhttp.send();
}