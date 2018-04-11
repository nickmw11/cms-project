// config/database.js

// To go to edit database, go to phpmyadmin.co
// Server: sql9.freesqldatabase.com
// Username: sql9229224
// Password: 6m2d4QZdzj

var mysql = require('mysql');

var url = 'mysql://sql9229224:6m2d4QZdzj@sql9.freesqldatabase.com:3306/sql9229224';
// module.exports = {

//     'url' : 'mysql://sql9229224:6m2d4QZdzj@sql9.freesqldatabase.com:3306/sql9229224'
    
// };

var connection = mysql.createConnection(url);

connection.connect(function(err){
    if (err) throw err;
})

module.exports = connection;
