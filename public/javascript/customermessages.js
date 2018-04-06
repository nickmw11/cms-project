// customermessages.js - loads customer messages to the customer messages page on CMS site
// Calls the function loadCustomerMessages
$(document).ready(function() {
    loadCustomerMessages();
    setInterval("loadCustomerMessages()",3000);
});

// call to node server
function loadCustomerMessages() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("messages").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "/messages", true);
    xhttp.send();
}