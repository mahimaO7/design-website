var express = require('express');
let mysql  = require('mysql');
let config = {
  host    : 'localhost',
  user    : 'root',
  password: 'root',
  database: 'verzeo'
};
let connection = mysql.createConnection(config);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function addContact(contact, res) {
  const add_contact_query = `INSERT INTO contacts(first_name, last_name, email, msg)
  VALUES(?,?,?,?)`;
  let contact_fields = [contact.first_name, contact.last_name, contact.email, contact.msg];
  connection.query(add_contact_query, contact_fields, (err, results) => {
    if (err) {
      res.status(500);
      return console.error(err.message);
    }
    res.status(200);

    res.json({status: "ok"})
  });
}

router.get('/api/contact', function(req, res, next) {
  const create_table_statement = "create table contacts (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, email VARCHAR(30) NOT NULL, msg TEXT);"; 
  const contact = req.query;
  console.log(contact);
  const table_exist_query = 'show tables like "contacts"';
  connection.query(table_exist_query,  (err, results) => {
    if (err) {
      res.status(500);
      res.end();
      return console.error(err.message);
    }
    console.log(results, results.length);
    if (results.length == 0) {
      connection.query(create_table_statement, (err, results) => {
        if (err) {
          res.status(500);
          res.end();
          return console.error(err.message);
        }
        addContact(contact, res);
      });
    } else addContact(contact, res);
  });
});

module.exports = router;
