const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send("Currently unavailable");
})

app.get('/admin', function(req, res) {
    res.send("Admin panel currently unavailable");
})

app.listen(process.env.PORT || 3000);
