const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bebjeyw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        // collections
        const categoriesCollection = client.db("mobileHeaven").collection("categories");
        const usersCollection = client.db("mobileHeaven").collection("users");

        // fetch categories 
        app.get('/categories', async (req, res) => {
            const query = {};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result);
        });

        // add users 
        app.post('/users' , async(req, res)=>{
            const user = req.body;
            // console.log(user);
            const query = {email: user.email}
            const userExists = await usersCollection.findOne(query);
            
            if(userExists){
                return;
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

    }
    finally {

    }

}

run().catch(err => console.error(err));


app.get('/', async (req, res) => {
    res.send('Mobile Heaven server is running')
});

app.listen(port, () => {
    console.log(`Mobile Heaven Server is running on ${[port]}`);
});