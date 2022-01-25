var express = require('express');
var app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {

        await client.connect()
        // console.log('db connected');

        const database = client.db('Homee');
        const recommendedProperties = database.collection('recommended')


        // get api for recommended properties
        app.get('/recommended', async (req, res) => {
            const result = await recommendedProperties.find({}).toArray()
            res.send(result)
        })

        //get single house details
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) }
            const house = await recommendedProperties.findOne(query);
            res.send(house)
        })

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("hello from server");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})