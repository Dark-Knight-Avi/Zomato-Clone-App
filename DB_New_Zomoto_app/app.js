const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./Routes/index');

const host = 'localhost';
const port = 2029;

const app = express();


app.use(cors());
app.options('*',cors());

app.use(express.json());
app.use('/', routes);

mongoose.connect('mongodb://vishnu21:k3bX8qNBe6ZxHm78@cluster0-shard-00-00.31ytj.mongodb.net:27017,cluster0-shard-00-01.31ytj.mongodb.net:27017,cluster0-shard-00-02.31ytj.mongodb.net:27017/Zomoto_DB?ssl=true&replicaSet=atlas-ef684n-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        app.listen(port, host, () => {
            console.log(`Server is running at ${host}:${port}`);
        });
    })
    .catch(err => console.log(err))

