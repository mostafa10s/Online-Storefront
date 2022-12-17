/* Seed Products */
insert into public.product (product_name, product_price) values ('Ruffino Chianti', 1.05);
insert into public.product (product_name, product_price) values ('German Riesling', 1.97);
insert into public.product (product_name, product_price) values ('Lamb - Shanks', 2.24);
insert into public.product (product_name, product_price) values ('Lamb - Whole Head Off', 5.85);
insert into public.product (product_name, product_price) values ('Pork - Loin, Bone - In', 2.26);
insert into public.product (product_name, product_price) values ('Sauce - Plum', 9.99);
insert into public.product (product_name, product_price) values ('Amaretto', 6.06);
insert into public.product (product_name, product_price) values ('Ice Cream - Fudge Bars', 7.83);
insert into public.product (product_name, product_price) values ('Shrimp - 21/25, Peel And Deviened', 7.22);
insert into public.product (product_name, product_price) values ('Ice Cream Bar - Hageen Daz To', 7.96);

/* Seed User */

/* user: admin, pass: 123456789 */
INSERT INTO public.users( last_name, first_name, passworde, user_name)
	VALUES ('Admin', 'Admin', '$2b$10$a/.SJCZjFnMqxxyyiQ5ZYOlyP82o.nTc31/dGX3HRO.z7aPKCdn6G', 'admin');
