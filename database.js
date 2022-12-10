`use strict`
const mysql = require('mysql');
let debug = require('./config.json').env=="dev"?console.log:()=>{}


let connection = null
const dbKey = require('./config.json').database

function validateDataAllString(data) {
    let keys = Object.keys(data)
    for (const key of keys) {
        if (typeof data[key] != 'string') {
            return false
        }
    }
    return true
}

async function insertDataDB(data) {
    try {
        if (validateDataAllString(data)) {
            let insertQuery = `INSERT INTO insaid_contacts(mobile,name,email,program) VALUES('${data.mobile}','${data.name}','${data.email}','${data.program}')`;

            resp = await connection.query(insertQuery);
            return resp;
        } else {
            throw  "Data format not valid"
        }
    } catch (error) {
        debug('insertData eror: ',error)
        throw {msg:"data not inserted",error}
    }
}

async function connectDB() {
    try {
        let dbConnection = mysql.createConnection(dbKey);
        if (dbConnection)
            debug(`connection established at ${Date()}\n`);
        else {
            debug(`Connection could not be established \n`);
            throw `Connection could not be established unfortunately!\n`
        }
        connection = dbConnection
        await initTableDB(connection)

    } catch (error) {
        debug(error)
        throw error;
    }
}

async function initTableDB() {
    try {
        let createTable = `create table if not exists insaid_contacts(
            mobile char(13)  NOT NULL,
            name char(50) NOT NULL,
            email char(50) NOT NULL,
            program char(50) NOT NULL
                            )`;


        return await connection.query(createTable, function (err, results, fields) {
            if (err) {
                debug(`error creating the table: `+err.message);
            }else{
                debug(results)
            }
        });

    } catch (e) {
        debug(e);
    }

}


async function terminateDB() {
    await connection?.end(function (err) {
        if (err) {
            debug(err.message);
        }
        debug(`connection terminated at ${Date()}`);
    });
}

module.exports = {
    connectDB,
    terminateDB,
    insertDataDB
}