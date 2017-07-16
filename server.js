console.log('May Node.js with you.');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://yi:apple7@ds034677.mlab.com:34677/good', (err, database) => {
	if (err) { 
		console.log(err);
		return;
	}
	db = database;
	app.listen(4000, function () {
		console.log('listing on 4000');
	});
});


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/abc', function (req, res) {
	res.send('Hello Daisy!');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
	console.log(__dirname);
});

app.post('/quotes', (req, res) => {
	console.log(req.body);
	db.collection('quotes').save(req.body, (err, results) => {
		if (err) {
			return console.log(err);
		}
		console.log('Saved to database.');
		res.redirect('/');
	})
});
