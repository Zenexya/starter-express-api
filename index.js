const express = require('mysql');
const app = express();

app.get('/', function(req, res) {
    res.send("Currently unavailable");
})

app.listen(3000, function() {
    console.log("[*]: Server started");
})
