var express = require('express');
var app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
const { json } = require('express');


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello from server");
})

app.listen(port, () => {
    console.log('runnig port no ', port);
})