const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const cors = require('cors')
const app = express();

const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.57jms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();



        const database = client.db("ema_John");
        const productcollection = database.collection("products");

        // get products
        app.get('/products', async (req, res) => {
            const cursor = productcollection.find({});
            const products = await cursor.toArray();
            const count = await cursor.count();
            res.send({
                count,
                products,
            });
        })
        // create a document to insert
        //   const doc = {
        //     title: "Record of a Shriveled Datum",
        //     content: "No bytes, no problem. Just insert a document, in MongoDB",
        //   }
        //   const result = await haiku.insertOne(doc);
        //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log("ema john running", port);
})