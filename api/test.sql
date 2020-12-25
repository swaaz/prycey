-- SQLite
-- FILL CATEGORY TABLE
PRAGMA foreign_keys = ON;
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (1, 'Electronics', "Electronic gadgets like Mobile, laptops and PC parts");
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (2, 'Books', "Books Fictional/Non fictional, Engineering etc");
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (3, 'Furniture', "Quality of Life furniture like Bean bags, beds etc");
INSERT INTO Category (cat_id, cat_name, cat_desc)
VALUES (4, 'Tools', "Tools like hacksaw, screwdriver kit, power tools, drills etc");

-- FILL USER TABLE
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('test', 'testpass', 'test', 'test@test.com', '98765432110', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('abc', 'testpass', 'test', 'abc@test.com', '987654324630', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('def', 'testpass', 'DEF', 'def@test.com', '9341832463', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('ghi', 'testpass', 'GHI', 'ghi@test.com', '98724324630', NULL);

-- FILL ITEMS TABLE
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (1, 'iPad Pro', 'No scratches', 60000.0, 1, '2020-12-22', 'blank', '', '', '', 1, 'test');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (2, 'iPhone X', 'Broken screen', 30000.0, 2, '2020-12-22', 'blank', '', '', '', 1, 'test');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (3, 'DBMS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-21', 'blank', '', '', '', 2, 'test');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (4, 'OS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-23', 'blank', '', '', '', 2, 'abc');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (5, '10mm Drill Bit', 'Drill bit only, no machine', 1000.0, 1, '2020-12-24', 'blank', '', '', '', 4, 'abc');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (6, 'Screw Driver set 16pc', 'All major screws with light', 2500.0, 1, '2020-12-24', 'blank', '', '', '', 4, 'def');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (7, 'Bean Bag', 'Big size bean bag with beans', 3000.0, 1, '2020-12-24', 'blank', '', '', '', 3, 'def');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (8, 'Study Table', 'Wooden Study table with chair', 2500.0, 1, '2020-12-24', 'blank', '', '', '', 3, 'ghi');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (9, 'AI/ML Textbook 7th Sem', '18 Scheme textbook', 500.0, 1, '2020-12-24', 'blank', '', '', '', 2, 'ghi');

-- DELETE FROM Items WHERE item_id = 5;
-- UPDATE User_Rating SET rating=0.0, no_of_ratings=0 WHERE user_id = 'abc';

