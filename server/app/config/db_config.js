const mysql = require('mysql')

// Connection to database
let sql_conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ghrefd11!',
    database:'login_db',
    multipleStatements:true
})

sql_conn.connect(err => {
    if(!err)
        console.log('connection established....')
    else
        console.error('connection error.......')
})

module.exports = sql_conn