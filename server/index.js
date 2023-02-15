const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("mysql");
const cors = require("cors");


const db = sql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbreservation"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let size = "";

app.get("/occupied", (req, res) =>{
    const select = "SELECT car_size AS carSize, slot_number AS slotNumber FROM reservation WHERE time_out IS NULL";
    db.query(select,(err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
            console.log(result);
        }
    })
})

app.post("/occupied",(req,res)=>{
    const slotNumber = req.body.id;
    const select = `SELECT time_in AS timeIn, time_out AS timeOut FROM reservation WHERE slot_number = '${slotNumber}' AND time_out IS NULL`;
    db.query(select,(err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
            console.log(result);
        }
    })
})

app.patch("/occupied", (req, res) =>{

    const slotNumber = req.body.id;
    const timeOut = req.body.timeOut;
    const update = `UPDATE reservation SET time_out='${timeOut}' WHERE slot_number = '${slotNumber}'` ;
    db.query(update,(err, result)=>{
        if(err){
            console.log("patch" + err);
        }
        else{
            res.send(result)
            console.log("patch" + result);
        }
    })
})

app.get("/parking-list", (req, res) =>{
    const select = "SELECT car_size, slot_number AS slotNumber FROM reservation WHERE time_out IS NULL LIMIT 15";
    db.query(select,(err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
            console.log(result);
        }
    })
})

app.post("/parking-list", (req, res) => {
    
    size = req.body.carSize;

    const owner = req.body.ownerName;
    const plateNumber = req.body.plateNumber;
    const carSize = req.body.carSize;
    const timeIn = req.body.timeIn;
    const slotNumber = req.body.slotNumber;
    const insert = "INSERT INTO reservation(owner, plate_number,car_size,time_in,slot_number) VALUES(?,?,?,?,?)";
    db.query(insert,[owner,plateNumber,carSize,timeIn,slotNumber], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
})

app.listen(3001, () => console.log("Connected to port 3001"));