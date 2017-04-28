var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongojs=require('mongojs');
var db=mongojs('todolist',['todolist']);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todolist',function(req,res){
	db.todolist.find(function(err,docs){
		res.json(docs);
	});
});

app.delete('/todolist/:id',function(req,res){
	var id=req.params.id;
	db.todolist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.post('/todolist',function(req,res){
	db.todolist.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

app.get('/todolist/:id',function(req,res){
	var id=req.params.id;
	db.todolist.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.put('/todolist/:id',function(req,res){
	var id=req.params.id;
	db.todolist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{title:req.body.title,text:req.body.text,due:req.body.due,status:req.body.status}},
		new:true},function(err,docs){
			res.json(docs);
		}
	);
});

app.put('/todolist/markincomplete/:id',function(req,res){
	var id=req.params.id;
	db.todolist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{status:'Incomplete'}},
		new:true},function(err,docs){
			res.json(docs);
		}
	);
});

app.put('/todolist/markcomplete/:id',function(req,res){
	var id=req.params.id;
	db.todolist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{status:'Complete'}},
		new:true},function(err,docs){
			res.json(docs);
		}
	);
});

app.listen(3000);
console.log("server is running in port 3000");