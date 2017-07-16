console.log('May Node.js with you.');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect('mongodb://yi:apple7@ds034677.mlab.com:34677/good', (err, database) => {
  if (err) {
    console.log(err);
    return;
  }
  db = database;
  app.listen(4000, function() {
    console.log('listing on 4000');
  });
});

// All your handlers here...

app.get('/abc', function(req, res) {
  res.send('Hello Daisy!');
});

// res.sendFile(__dirname + '/index.html');

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function (err, results) {
  	//console.log(results);
  	if (err) {
  		return console.log(err);
  	}
  	res.render('index.ejs', {quotes: results});
  });

});

app.post('/quotes', (req, res) => {
  console.log('Add: ', req.body);
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.log('Saved to database.');
    res.redirect('/');
  })
});

//Update,
app.put('/quotes', (req, res) => {
	console.log('Update: ' + JSON.stringify(req.body));
  db.collection('quotes').findOneAndUpdate({
      name: 'Yi'
    }, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    },
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    }
  );
});

//Delete,
app.delete('/quotes', (req, res) => {
  console.log('Delete: ' + JSON.stringify(req.body));
  db.collection('quotes').findOneAndDelete({
      name: req.body.name
    },
    (err, result) => {
      if (err) {
        return res.send(500, err);
      }
      result.message = 'Delete on quote.';
      res.send(result);
    }
  );
});
