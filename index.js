const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send("Currently unavailable");
})

app.listen(process.env.PORT || 3000);
