const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

var usersdb;
var questionsdb;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb+srv://dmi3z:n2zk8hp60l@tests-db-sxxgo.mongodb.net/test?retryWrites=true&w=majority', (err, database) => {
    if (err) {
        return console.log(err);
    }
    usersdb = database.db('users');
    questionsdb = database.db('questions');

    app.listen(port);
    console.log('API app started! Port: ', port);
    console.log('2. Connection to DB was success!');
})


// --------- API --------------
app.get('/', (_, res) => {
    res.send('Welcome to TestsHtml API');
});

app.get('/questions', (req, res) => {
    questionsdb.collection('questions').find().toArray((err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            res.sendStatus(404);
        }
    })
});

app.post('/result', (req, res) => {
    const data = req.body;
    usersdb.collection('users').insertOne(data, (response, error) => {
        if (error) {
            return res.sendStatus(500);
        }
        return res.send(1);
    });
});

app.get('/results', (req, res) => {
    usersdb.collection('users').find().toArray((err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            res.sendStatus(404);
        }
    })
});

