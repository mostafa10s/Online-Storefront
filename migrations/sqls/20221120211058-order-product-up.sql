/* Replace with your SQL commands */
create TABLE order_prodacts (
 id SERIAL PRIMARY KEY,  order_id integer REFERENCES orders (id), product_id integer REFERENCES product (product_id),quantity INTEGER
)