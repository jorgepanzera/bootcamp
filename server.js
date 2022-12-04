const express = require('express');
// Constants
const hostname = '0.0.0.0';
const port = 8080;

// App
const app = express();

// Datos para metodo PUT, para crear mensaje nuevo en caso de no encontrar
var path = require('path');
const os = require("os");

/* Get hostname of os in Node.js */
const hostName = os.hostname();
var scriptName = path.basename(__filename);

var message = "para utilizar en PUT";

/* Get DateTime, timezone and offset - Para metodo PUT, cuando no encuentra */
const date = new Date()
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var offset_minutes = date.getTimezoneOffset();
if (offset_minutes <= 0) {
  var offset = "UTC+" + (offset_minutes/-60).toString();
}
else {
  var offset = "UTC" + (offset_minutes/-60).toString();
}


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
app.put('/:host', function (req, res) {
    let host = req.params.host;
    if (host == undefined) {     // Me fijo si existe parametro
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
                    // HAY QUE HACER UPDATE
                    message = "Mensaje updateado por PUT (found host)";
                    // Armar un mensaje con los campos para updatear
                    const updateDoc = { $set: { message: message, date: date, offset: offset } };
                    console.log(updateDoc);
                    dbo.collection("calls").updateMany(query , updateDoc, function(err, res_upd) {
                        if(err) throw err;
                        //console.log(res_upd.modifiedCount + " Record(s) updated successfully");
                        // 200 OK	
                        res.status(200).send(res_upd.modifiedCount + " Record(s) updated successfully");
                        db.close();   
                    }); // updateMany
                } else {
                    message = "Mensaje insertado por PUT (not found)";
                    var myobj = { message: message, scope: scriptName, host: hostName, date: date , location: timezone, offset: offset};
                    dbo.collection("calls").insertOne(myobj, function(err, res_insert) {
                        if (err) throw err;
                        console.log(myobj);
                        console.log(`Document inserted in database.`);
                        // 201 OK
                        res.status(201).send("No hay datos con el parametro recibido, se inserto nuevo mensaje");
                        db.close();   
                    }); // insertOne
                };// else cant > 0
            }); // toArray
        }); // connect
    }; // else host undefinded
}); // put

/* DELETE method. Deleting the messages based on hostname. 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
app.delete('/:host', function (req, res) {
    let host = req.params.host;
    if (host == undefined) {     // Me fijo si existe parametro
        // 400 Bad Request
        res.status(400).send("Parametro host no recibido.");
    } else {
        MongoClient.connect(url, function(err,db) {
            if (err) throw err;
            var dbo = db.db("my-test-db");
            var query = { host : host };
            dbo.collection("calls").deleteMany(query , function(err, res_del) {
                if(err) throw err;
                var cant = res_del.deletedCount;
                console.log(cant);
                if (cant > 0) {
                    // 200 OK	
                    res.status(200).send(cant + " Record(s) deleted successfully");
                    db.close();   
                } else {
                    // 204 Not Found
                    res.status(204).send("No records found");
                    db.close();  
                }; // else cant > 0
            }); // deleteMany
        }); // connect
    }; // else host undefinded
}); // delete

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);

