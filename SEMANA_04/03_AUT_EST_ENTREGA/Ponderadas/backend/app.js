const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/curriculo.db';

const hostname = '127.0.0.1';
const port = 3021;
const app = express();


app.use(express.json());


app.get('/listaCurriculo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); 
	var sql = 'SELECT * FROM curriculo ORDER BY foto COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close();
});


app.post('/insereCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH);
	sql = "INSERT INTO curriculo (foto, cargo, descricao, nome, endereco, email, telefone) VALUES ('" + req.body.foto + "', '" + req.body.cargo + "', '" + req.body.descricao + "' , '" + req.body.nome + "' , '" + req.body.endereco + "', '" + req.body.email + "' , '" + req.body.telefone + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	db.close();
	res.end();
});


app.get('/atualizaCurriculo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM curriculo WHERE id="+ req.query.id;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});


app.post('/atualizaCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE curriculo SET foto='" + req.body.foto + "', cargo= '" + req.body.cargo + "' , descricao='" + req.body.descricao + "', nome='" + req.body.nome + "', endereco= '" + req.body.endereco + "' , email='" + req.body.email + "', telefone= '"+req.body.telefone + "' WHERE id='" + req.body.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});


app.get('/removeCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM curriculo WHERE id='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});