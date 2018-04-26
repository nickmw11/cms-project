/* Filename: about.js
 * Description: This file updates the about page every 3 seconds, displaying all the employees
 * in the database.
 */

/* This function includes an initial call to loadAbout, and then
 * calls it every 3 seconds
 */
$(document).ready(function() {
    loadAbout();
    setInterval("loadAbout()",3000);
});

/* This function creates the xhttp request "/articles/displayArticles" and sends it to the server.
 * The response text is put into a div with id="articles"
 */
function loadAbout() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("aboutPreview").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/about/displayAbout", true);
    xhttp.send();
}