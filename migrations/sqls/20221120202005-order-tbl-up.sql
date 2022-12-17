/* Replace with your SQL commands */
Create Table orders (id SERIAL Primary Key, user_id integer REFERENCES users (user_id), order_statues VARCHAR (10))