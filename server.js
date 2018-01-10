var express = require("express");
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contact',['contactList']);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Load a static page from application.
app.use(express.static(__dirname + "/public"))

//loaad data from server and send to angular controller
app.get('/contactList',function(req,res){
    console.log('Received get request.');
	db.contact.find(function(err,doc){
		console.log(doc);
		res.send(doc);
	});
	
	/*var contacts = [{firstname:'Laxmidhar',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Suresh',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Mahesh',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Krishna',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'}];
	res.json(contacts);*/
});

//save data to mongo db
app.post('/contactList',function(req,res){
    console.log('Received post request.');
	db.contact.insert(req.body,function(err,doc){
		console.log(doc);
		res.json(doc);
	});
});

//delete data to mongo db
app.delete('/contactList/:id',function(req,res){
    var id = req.params.id;
  	console.log('Received delete request.'+id);
	db.contact.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//get data from mongo db based on id
app.get('/contactList/:id',function(req,res){
    var id = req.params.id;
  	console.log('Received get request with param.'+id);
	db.contact.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//update data to mongo db based on id
app.put('/contactList/:id',function(req,res){
    var id = req.params.id;
  	console.log('Received put request ');
	db.contact.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update : {$set : {firstName : req.body.firstName,lastName:req.body.lastName,
			age:req.body.age,city:req.body.city,country:req.body.country}},
		new : true},function(err,doc){
			console.log('Received updated  from DB '+ doc);
			res.json(doc);
	});
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');