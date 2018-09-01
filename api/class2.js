const express = require("express");
const router = express.Router();

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
db.run("PRAGMA foreign_keys = ON");

router.get("/customers", function(req, res) {
  var sql = "select * from customers";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});

router.get("/customers/:id", function(req, res) {
  // TODO: add code here
  let reqid = req.params.id;
  var sql = `select * from customers where id = ${reqid}`;

  db.all(sql, [params], (err, rows) => {
    res.status(200).json({
      id: customers.id,
      firstName: customers.firstname,
      surname: customers.surname,
      email: customers.email
    });
  });
});

router.get("/customers/surname/:surname", function(req, res) {
  // TODO: add code here
  let reqsurrname = req.params.surname;
  var sql = `select * from customers where surname like '%${reqsurrname}%'`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});

router.post("/customers/", function(req, res) {
  console.log(req.body);
  var sql = `INSERT INTO customers(title, firstname, surname, email) VALUES('${
    req.body.title
  }', '${req.body.firstname}', '${req.body.surname}', '${req.body.email}')`;
  db.run(sql, [], err => {
    res.status(200).json({});
  });

  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  // TODO: add code here
});

router.put("/customers/:id", function(req, res) {
  console.log(req.body);
  let reqid = req.params.id;
  var sql = `UPDATE customers SET title = '${req.body.title}', firstname = '${
    req.body.firstname
  }', surname = '${req.body.surname}', email = '${
    req.body.email
  }' WHERE  id = ${reqid}`;
  db.run(sql);
  res.status(200).json({ success: "yes" });

  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  // TODO: add code here
});

// get '/reservations'
// TODO: add code here
router.get("/reservations", function(req, res) {
  var sql = "select * from reservations";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({ reservations: rows });
  });
});

// get '/reservations/:id'
// TODO: add code here

// delete '/reservations/:id'
// TODO: add code here
router.delete("/reservations/:id", function(req, res) {
  console.log(req.body);
  let reqid = req.params.id;

  var sql = `DELETE FROM reservations WHERE id = ${reqid}`;
  db.run(sql);
  res.status(200).json({ success: "yes" });
});
// get '/reservations/starting-on/:startDate'
// TODO: add code here
// get '/reservations/active-on/:date'
// TODO: add code here

// post '/reservations'
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
//   check_out_date: '2018-01-22',
//   room_price: 129.90
// }
// TODO: add code here

// get `/detailed-invoices'
// TODO: add code here

// get `/invoices/details-between/:from_day/:to_day`
// TODO: add code here
// get '/invoices'
// TODO: add code here
router.get("/invoices", function(req, res) {
  var sql = "select * from invoices";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});
router.get("/invoices/:id", function(req, res) {
  // TODO: add code here
  let reqid = req.params.id;
  var sql = `select * from invoices where id = ${reqid}`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});
module.exports = router;
