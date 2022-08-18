const express = require('mysql');
const app = express();

app.get('/', function(req, res) {
    res.send("Currently unavailable");
})

app.listen(process.env.PORT || 3000);
