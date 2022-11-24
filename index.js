const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Mobile Heaven server is running')
});

app.listen(port, () => {
    console.log(`Mobile Heaven Server is running on ${[port]}`);
});