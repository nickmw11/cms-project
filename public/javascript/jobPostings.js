/* Filename: jobPostings.js
 * Description: This file updates a div with id jobPreview every 3 seconds, displaying all the jobPostings
 * in the database.
 */

/* This function includes an initial call to loadArticles, and then
 * calls it every 3 seconds
 */
$(document).ready(function() {
    loadJobs();
    setInterval("loadJobs()",3000);
});

/* This function creates the xhttp request "/articles/displayArticles" and sends it to the server.
 * The response text is put into a div with id="articles"
 */
function loadJobs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("jobPreview").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/jobpostings/displayJobPostings", true);
    xhttp.send();
}