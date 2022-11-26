const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bebjeyw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    });
}


async function run() {

    try {
        // collections
        const categoriesCollection = client.db("mobileHeaven").collection("categories");
        const usersCollection = client.db("mobileHeaven").collection("users");
        const phonesCollection = client.db("mobileHeaven").collection("phones");

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;

            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
            return res.send({ accessToken: token });

        });

        // fetch categories 
        app.get('/categories', async (req, res) => {
            const query = {};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result);
        });

        //get  user
        app.get('/users', verifyJWT, async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // add users 
        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const query = { email: user.email }
            const userExists = await usersCollection.findOne(query);

            if (userExists) {
                return;
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // for selllers 
        app.get('/users/seller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send({ isSeller: user?.role === 'seller' });
        });

        // for admin 
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        });

        app.get('/buyers', verifyJWT, async (req, res) => {
            const query = { role: 'user' };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        });


        //get phones/products

        app.get('/phones', verifyJWT, async (req, res) => {

            const email = req.query.email;
            const query = { email: email };
            const result = await phonesCollection.find(query).toArray();
            res.send(result);

        });


        //phones\products post

        app.post('/phones', verifyJWT, async (req, res) => {
            const phone = req.body;
            const result = await phonesCollection.insertOne(phone);
            res.send(result);
        });

        //update a phone
        app.put('/phones/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    advertised: true
                }
            };
            const result = await phonesCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        app.get('/addStatus', async (req, res) => {
            const filter = {};
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    status: "unsold"
                }
            };
            const result = await phonesCollection.updateMany(filter, updatedDoc, options);
            res.send(result);
        })

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