const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');

const PORT = 3000
const user = require('./routes/user');
const intimate = require('./routes/intimate');
const mongoose = require("mongoose")

const app = express()

const db ="mongodb://localhost:27017/homedb"
mongoose.connect(db, err =>{
    if (err) {  
        console.error("Error!" + err)
    } else {
        console.log("Connected to mongodb") 
    }
});

app.use(bodyParser.json())
app.use(cors());

app.use("/user" , user);
app.use("/intimate", intimate);

app.get("/", function(req, res){
    res.send("hello from server")
})

app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT)
})