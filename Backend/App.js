const express = require('express');
const connection = require('./db');
const cors = require('cors')

//db connection
connection().catch(err=> console.log(err));
//end

const PORT = 8888;
const app = express();
app.use("/Images",express.static("uploads"))
app.use(cors())
const api_Routes = require('./routes/Api_Routes');
app.use(express.json()); //to parse post data
app.use("/", api_Routes);

app.listen(PORT,(err) => {
    if(err) throw err;
    else console.log(`server work on this port ${PORT}`)
})