const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'auth_db' // Ganti dengan nama database Anda
});
const csv = require('csvjson')
const knex = require('./knex')
const fs = require('fs')

const file = fs.readFileSync('data.csv', 'utf8')
const dataObj = csv.toObject(file)

knex.insert(dataObj)
    .into('employees')
    .then(() => {
        console.log('Import data done!')
        process.exit(0)
    })
    .catch(() => {
        console.log('Import data failed')
        process.exit(0)
    })