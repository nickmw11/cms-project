/* Filename: blog.js
 * Description: This file updates a div with id blogPreview every 3 seconds, displaying all the blogs
 * in the database.
 */

/* This function includes an initial call to loadBlogs, and then
 * calls it every 3 seconds
 */
$(document).ready(function() {
    loadBlogs();
    setInterval("loadBlogs()",3000);

});

/* This function creates the xhttp request with url "/blog/displayBlogs" and sends it to the server.
 * The response text is put into a div with id="blogPreview"
 */
function loadBlogs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("blogPreview").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/blog/displayBlogs", true);
    xhttp.send();
}