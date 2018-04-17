/* File name: customermessages.js
 * Description: Loads customer messages to the customer messages page on CMS site
 */

/* Description: This creates an Ajax call the function loadCustomerMessages,
 * It then proceeds to call the function every 3 seconds.
 */
$(document).ready(function() {
    loadCustomerMessages();
    setInterval("loadCustomerMessages()",3000);
});

/* Function name: loadCustomerMessages
 * Description: Sends a get request to the app.js server file.
 * The response should contain the body of the customer messages.
 * This text is then assigned to the div with id="messages"
 */
function loadCustomerMessages() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("messages").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/customermessages/displayMessages", true);
    xhttp.send();
}