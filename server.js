const express = require('express');
// Constants
const hostname = '0.0.0.0';
const port = 8080;

// App
const app = express();

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});
  
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

// GET method route
app.get('/secret', function (req, res, next) {
    res.send('Never be cruel, never be cowardly. And never eat pears!');
    console.log('This is a console.log message.');
});

/*
Your implementation here 
*/

// // Connect to mongodb server
const MongoClient = require('mongodb').MongoClient;
// /* Your url connection to mongodb container */
const url = `mongodb://localhost:27017/`;

// GET method route
// Retrieve all documents in collection
app.get('/query/all', function (req, res) {
    MongoClient.connect(url,function(err,db) {
        if (err) throw err;
        var dbo = db.db("my-test-db");
        var query = {};
        dbo.collection("calls").find(query).toArray(function(err,result) {
            if (err) throw err;
            console.log(result.length);
            var cant = result.length;
            if (cant > 0) {
                console.log(result);
                // 200 OK
                res.status(200).send(result);
                db.close();                         
            } else {
                // 200 OK
                res.status(200).send("No hay datos en la coleccion");
                db.close();   
                };
        }); // toArray
    }); // connect
}); // get

// GET method route
// Query by hostname
app.get('/query', function (req, res) {
    // Me fijo si existe parametro
    let host = req.query.host;
    if (host == undefined) {
        // 400 Bad Request
        res.status(400).send("Parametro host no recibido.");
    } else {
        MongoClient.connect(url,function(err,db) {
            if (err) throw err;
            var dbo = db.db("my-test-db");
            var query = { host : host };
            dbo.collection("calls").find(query).toArray(function(err,result) {
                if (err) throw err;
                console.log(result.length);
                var cant = result.length;
                if (cant > 0) {
                    console.log(result);
                    // 200 OK
                    res.status(200).send(result);
                    db.close();                         
                } else {
                    // 200 OK
                    res.status(200).send("No hay datos con el parametro recibido");
                    db.close();   
                    };
            }); // toArray
        }); // connect
    }; // else
}); // get

/* PUT method. Modifying the message based on host. 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
// ...

/* DELETE method. Modifying the message based on hostname. 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
// ...

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);

