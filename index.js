var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var server = express()
var port = 3000

server.use(bodyParser.json()) // turns get request into json file (stringifies it)
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
server.use('/', express.static(`${__dirname}/public`))

// Database Stuff
var connectionstring = 'mongodb://student:student@ds137101.mlab.com:37101/books'
var connection = mongoose.connection;
// DOES NOT CHANGE
mongoose.connect(connectionstring, {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', function (err) { // listens anytime there's an error
    console.log('THERE WAS A CONNECTION PROBLEM', err)
})

connection.once('open', function () { //listens for open just one time
    console.log('We are now connected to the books database')
    server.listen(port, function () {
        console.log('YEP its working', 'http://localhost:' + port)
    })
})

// above this line, most things stay exactly the same!!!

var Schema = mongoose.Schema
var BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, default: 1 },
    published: { type: String }
})
var Book = mongoose.model('Book', BookSchema)

server.get('/', function(req, res, next){
    res.send('“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.” - Jane Austen')
})

server.get('/books', function(req,res,next){ // Book references the schema 
    Book.find({}).then(function(books){
        res.send(books)

    }) // find anything that is an object, .then takes in a callback
    //and then takes what the .find found and res.send sends back all of the books found
})

server.post('/books', function(req,res,next){ // creates new book using BOOK schema and sends back new book
    var newBook = req.body // body is the book schema: title author info etc entered by user
    Book.create(newBook).then(function(newlyCreatedBook){
        res.send(newlyCreatedBook)
    })
})

// server.listen(3000, function () {
//     console.log("The server is working and listening for requests on port: ", port)
// })