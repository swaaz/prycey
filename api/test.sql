-- SQLite
-- FILL CATEGORY TABLE
PRAGMA foreign_keys = ON;
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (1, 'Electronics', "Electronic gadgets like Mobile, laptops and PC parts");
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (2, 'Books', "Books Fictional/Non fictional, Engineering etc");
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (3, 'Furniture', "Quality of Life furniture like Bean bags, beds etc");

-- FILL USER TABLE
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('test', 'testpass', 'test', 'test@test.com', '98765432110', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('abc', 'testpass', 'test', 'abc@test.com', '987654324630', NULL);

-- FILL ITEMS TABLE
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (1, 'iPad Pro', 'No scratches', 60000.0, 1, '2020-12-22', 'blank', '', '', '', 1, 'test');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (2, 'iPhone X', 'Broken screen', 30000.0, 2, '2020-12-22', 'blank', '', '', '', 1, 'test');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (3, 'DBMS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-21', 'blank', '', '', '', 2, 'test');
PRAGMA foreign_keys = ON;
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (4, 'OS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-21', 'blank', '', '', '', 2, 'tester');

-- DELETE FROM Items WHERE c_id = 4;

