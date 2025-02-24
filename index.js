const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');
const express = require('express');
const app = express();

const uri = "mongodb+srv://axzyre:Juniorek2010@ballistic.qbs6hdo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  console.log(">>> Connection estabilished!");
});

async function check(hwid) {
    const database = client.db("ballistic");
    const hwids = database.collection("hwid");
    const query = {hwid: hwid};
    const options = {
        projection: {_id: 0, hwid: 1},
    };
    const found = hwids.findOne(query);
    if(found == "null") {
        return "not_whitelisted";
    }
    else {
        return "whitelisted";
    }
}

app.get('/api/login', (req, res) => {
    var hwidgot = req.query.hwid;
    client.db("ballistic").collection("hwid").findOne({hwid: hwidgot}, function(err, hwid) {
        if(hwid){
            res.send("HWID Exists");
        }
        else {
            res.send("HWID does not exist")
        }
    })
})

app.get("/api/insert", (req, res) => {
    var HwidToInsert = req.query.hwid;
    client.db("ballistic").collection("hwid").insertOne({ hwid: HwidToInsert }, function(err, hwid) {
        if(err) throw err;
        if(hwid) {
            res.send("HWID Succesfully added")
        }
        else {
            res.send("HWID Does not exist");
        }
    });
})

app.get("/api/remove", (req, res) => {
    var HwidToRemove = req.query.hwid;
    client.db("ballistic").collection("hwid").deleteOne({ hwid: HwidToRemove }, function(err, hwid) {
        if(err) throw err;
        res.send("HWID succesfully removed from the database");
    })
})

app.listen(3000, () => {
    console.log(">>> Express server started");
})
