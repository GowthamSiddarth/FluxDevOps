const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("hello");
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
    console.log("server running on " + PORT);
})