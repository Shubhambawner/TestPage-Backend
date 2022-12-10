let {terminateDB,connectDB} = require('./database')
let initializeExpress = require('./server')
let debug = require('./config.json').env=="dev"?console.log:()=>{}


// main functional code to start
try {
    connectDB()
    .then(resp=>{
        initializeExpress();
    })
} catch (error) {
    terminateDB();
    debug('error: terminating the db connection: ',error)
}
