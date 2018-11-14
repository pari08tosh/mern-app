const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const config = require("./config.json");
const items = require('./routes/items');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/items', items);
app.use('/users', users);

app.use(express.static('./client/build'));

mongoose
    .connect(config.dbURI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.error(err);
    });

app.listen(config.port, () => {
    console.log(`Server Started on port ${config.port}`);
});