
Homework 1
select * from customers where id = 3;

UPDATE customers
SET surename = 'Smith'
WHERE
 id = 3;

 Homework 2

 INSERT INTO reservations ( customer_id, room_id, check_in_date, check_out_date, room_price) VALUES ( 1, 2, '2018-10-05', '2018-10-25', 200);

  Homework 3

  select * from reservations;

  select * from reservations where id = 2;

  Homework 4

  select * from reservatiosn;

  select * from reservations where check_in_date >= '2018-10-01';

   Homework 4

  select * from reservatiosn;

  select * from reservations where check_in_date >= '2018-10-01' and check_in_date <= '2018-10-01' ;


  Week 18

  Homework 1

  select * from reservations JOIN invoices ON reservations.id = invoices.reservation_id;

Homework 2
SELECT sum(total) FROM invoices where invoice_date_time >= '2017-04-01' and invoice_date_time <= '2017-08-31';

homwork 3

 select count(*) as number_of_visit, customer_id from reservations group by customer_id order by number_of_visit desc;

select count(*) as number_of_visit, customer_id, firstname, surname from reservations JOIN customers ON reservations.customer_id = customers.id group by customer_id order by number_of_visit desc;


 Homework 4

select count(*) as number_of_visit, customer_id, firstname, surname from reservations JOIN customers ON reservations.customer_id = customers.id group by customer_id order by number_of_visit desc;




