const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = 'database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// get '/reservations-and-invoices/'
// TODO: add code here

router.delete('/reservations/:id', function(req, res) {
  const id = req.params.id;
  const sql = `delete from reservations where id = ${id}`;

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log("Successfully removed reservation");
    res.status(200).json({
      message: "Successfully removed reservation"
    });
  });
});


// get `/reservations-per-customer/`
// TODO: add code here

router.get("/reservations-per-customer/", function(req, res) {
  var sql = "select count(*), customers.firstname, customers.surname from reservations JOIN customers ON reservations.customer_id = customers.id group by customer_id;";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});




// HOMEWORK
// get '/reservations/details-between/:from_day/:to_day'
// TODO: add for code here
router.get("/reservations/details-between/:from_day/:to_day", function(
  req,
  res
) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select * from reservations where check_in_date >= ${reqStartdate} and check_in_date <= ${reqEndtdate}`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});



// HOMEWORK
// get '/reservations-per-customer/'
// TODO: add code here

router.get("/reservations-per-customer/", function(req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select count(*) as number_of_visit, customer_id, firstname, surname from reservations JOIN customers ON reservations.customer_id = customers.id group by customer_id order by number_of_visit desc`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});

// homework 4

router.get("/reservations-per-room/", function (req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select  reservations.room_id, count(*), room_types.type_name, rooms.sea_view from reservations INNER JOIN rooms ON reservations.room_id = rooms.id INNER JOIN  room_types ON rooms.room_type_id = room_types.id GROUP BY reservations.room_id`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});
// homework 5

router.get("/reservations-sea-view-room/", function (req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select  reservations.room_id, count(*) AS count, room_types.type_name, rooms.sea_view from reservations INNER JOIN rooms ON reservations.room_id = rooms.id INNER JOIN  room_types ON rooms.room_type_id = room_types.id GROUP BY reservations.room_id HAVING count >= 5`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});

// homework 8

router.get("/reservations/details-between/:from_day/:to_day", function (req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select * from reservations where check_in_date >= ${reqStartdate} and check_in_date <= ${reqEndtdate}`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});

// HOMEWORK 9 /reservations-per-customer/

router.get("/reservations-per-customer", function (req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select *, count(customer_id) as customer_reservations from reservations JOIN customers ON reservations.customer_id = customers.id GROUP BY customer_id`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});

// HOMEWORK 10  /stats-price-room/;

router.get("/stats-price-room/", function(req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select *, count(room_id) AS number_reservations, SUM(room_price) as total_price_room, AVG(room_price) AS average from reservations JOIN rooms ON reservations.room_id = rooms.id GROUP BY room_id`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});



// homework 11 /rooms/available-in/:from_day/:to_day


router.get("/rooms/available-in/:from_day/:to_day", function(req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;

  var sql = `SELECT id, room_type_id FROM rooms WHERE id NOT IN
(
    SELECT room_id
    FROM   reservations R
           JOIN rooms RR
               ON R.room_id = RR.id
    WHERE  (check_in_date <= ${reqStartdate} AND check_out_date >= ${reqEndtdate})
           OR (check_in_date < ${reqEndtdate} AND check_out_date >= ${reqEndtdate} )
           OR (${reqStartdate} <= check_in_date AND ${reqEndtdate} >= check_out_date)

)`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});

/*


SELECT id, room_type_id
FROM rooms
WHERE id NOT IN
(
    SELECT room_id
    FROM   reservations R
           JOIN rooms RR
               ON R.room_id = RR.id
    WHERE  (check_in_date <= '2018-07-11' AND check_out_date >= '2018-09-12')
           OR (check_in_date < '2018-09-12' AND check_out_date >= '2018-09-12' )
           OR ('2018-07-11' <= check_in_date AND '2018-09-12' >= check_out_date)

);


// HOMEWORK
// get `/stats-price-room/`
// TODO: add code here

*/

module.exports = router;



router.get("/customers/:id", function (req, res) {
  // TODO: add code here
  let reqid = req.params.id;
  var sql = `select * from customers where id = ${reqid}`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({ customers: rows });
    // id: customers.id,
    // firstName: customers.firstname,
    // surname: customers.surname,
    // email: customers.email
  });
});

router.get("/customers/surname/:surname", function (req, res) {
  // TODO: add code here
  let reqsurrname = req.params.surname;
  var sql = `select * from customers where surname like '%${reqsurrname}%'`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});

router.post("/customers/", function (req, res) {
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

router.put("/customers/:id", function (req, res) {
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
router.get("/reservations", function (req, res) {
  var sql = "select * from reservations";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({ reservations: rows });
  });
});

// get '/reservations/:id'
// TODO: add code here
router.get("/reservations/:id", function (req, res) {
  console.log(req.body);
  let reqid = req.params.id;

  var sql = `select * FROM reservations WHERE id = ${reqid}`;
  db.all(sql, [], (err, rows) => {
    res.status(200).json({ reservations: rows });
  });
});
// delete '/reservations/:id'
// TODO: add code here
router.delete("/reservations/:id", function (req, res) {
  console.log(req.body);
  let reqid = req.params.id;

  var sql = `DELETE FROM reservations WHERE id = ${reqid}`;
  db.run(sql);
  res.status(200).json({ success: "yes" });
});
// get '/reservations/starting-on/:startDate'
// TODO: add code here
router.get("/reservations/:date", function (req, res) {
  // TODO: add code here
  let reqdate = req.params.date;
  var sql = `select * from reservations where check_in_date = ${reqdate}`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});

// get '/reservations/active-on/:date'
// TODO: add code here
router.get("/reservations/active-on/:date", function (req, res) {
  // TODO: add code here
  let reqdate = req.params.date;
  let activeDate = Date();
  var sql = `select * from reservations where check_in_date = ${reqdate}`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      reservations: rows
    });
  });
});
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
router.get("/invoices/details-between/:from_day/:to_day", function (req, res) {
  // TODO: add code here
  let reqStartdate = req.params.from_day;
  let reqEndtdate = req.params.to_day;
  var sql = `select * from invoices where invoice_date_time >= ${reqStartdate} and invoice_date_time <= ${reqEndtdate}`;

  db.all(sql, [], [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});

// get '/invoices'
// TODO: add code here
router.get("/invoices", function (req, res) {
  var sql = "select * from invoices";

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});
router.get("/invoices/:id", function (req, res) {
  // TODO: add code here
  let reqid = req.params.id;
  var sql = `select * from invoices where id = ${reqid}`;

  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      invoices: rows
    });
  });
});

