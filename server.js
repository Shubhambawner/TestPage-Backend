`use strict`
const express = require('express');
const PORT = require('./config.json').PORT
let debug = require('./config.json').env == "dev" ? console.log : () => { }
let cors = require('cors')

let { insertDataDB, terminateDB } = require('./database')

const initializeExpress = async () => {
    const app = express();
    app.use(cors());

    app.use(express.json());

    setRouts(app)


    app.listen(PORT, async () => {
        debug("This service is running on PORT : " + PORT);
    });
}

function setRouts(app) {
    app.get("/health", (req, res, next) => {
        res.status(200).json({
            'status': 'ok'
        })
    })
    app.post("/contacts", insertContactDataController)

}

function insertContactDataController(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    debug(req, 'arr')
    let resp = insertDataDB(req.body)
        .then(resp => res.status(200).json({
            'status': 'ok'
        })
        )
        .catch(error => {
            res.status(500).json({
                status: 'error in insertion of data',
                error: error
            })
        })
}

module.exports = initializeExpress 