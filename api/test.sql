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
VALUES ('johndoe', 'testpass', 'John Doe', 'john@test.com', '98765432110', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('adamgil', 'testpass', 'Adam Gilbert', 'adam@test.com', '987654324630', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('jennaf', 'testpass', 'Jenna Fischer', 'jenna@test.com', '9341832463', NULL);
INSERT INTO Users (user_id, password, name, email, contact_number, profile_image)
VALUES ('captjack', 'testpass', 'Jack Sparrow', 'jack@test.com', '98724324630', NULL);

-- FILL ITEMS TABLE
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (1, 'iPad Pro', 'No scratches', 60000.0, 1, '2020-12-22', 'ipad_pro.png', '', '', '', 1, 'johndoe');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (2, 'iPhone X', 'Broken screen', 30000.0, 2, '2020-12-22', 'iphone_x.png', '', '', '', 1, 'johndoe');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (3, 'DBMS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-21', 'dbms_textbook.png', '', '', '', 2, 'johndoe');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (4, 'OS Textbook', '18 Scheme VTU', 300.0, 1, '2020-12-23', 'os_textbook.png', '', '', '', 2, 'adamgil');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (5, '10mm Drill Bit', 'Drill bit only, no machine', 1000.0, 1, '2020-12-24', '10mm_bit.png', '', '', '', 4, 'adamgil');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (6, 'Screw Driver set 16pc', 'All major screws with light', 2500.0, 1, '2020-12-24', 'screw_set.png', '', '', '', 4, 'jennaf');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (7, 'Bean Bag', 'Big size bean bag with beans', 3000.0, 1, '2020-12-24', 'bean_bag.png', '', '', '', 3, 'jennaf');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (8, 'Study Table', 'Wooden Study table with chair', 2500.0, 1, '2020-12-24', 'study_table.png', '', '', '', 3, 'captjack');
INSERT INTO Items (item_id, title, description, price, year, date_added, im1, im2, im3, im4, c_id, seller_id)
VALUES (9, 'AI/ML Textbook 7th Sem', '18 Scheme textbook', 500.0, 1, '2020-12-24', 'ai_textbook.png', '', '', '', 2, 'captjack');

INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('johndoe', 'adamgil', 4.5);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('adamgil', 'jennaf', 3.5);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('adamgil', 'captjack', 4.5);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('johndoe', 'jennaf', 3.0);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('captjack', 'johndoe', 5.0);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('captjack', 'jennaf', 4.0);
INSERT INTO RATED ('user_id', 'rated_id', 'rating') VALUES ('captjack', 'adamgil', 3.0);

-- DELETE FROM Items WHERE item_id = 5;
-- UPDATE User_Rating SET rating=0.0, no_of_ratings=0 WHERE user_id = 'abc';
-- UPDATE Users SET name='John Doe' WHERE user_id = 'test';
-- UPDATE Users SET name='John Doe' WHERE user_id = 'test';
-- UPDATE Users SET name='John Doe' WHERE user_id = 'test';
-- UPDATE Items SET description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nostrum, officia voluptas voluptatem deserunt ut vel quae corrupti aperiam cupiditate repudiandae, labore quisquam ullam architecto, sequi reprehenderit iusto beatae quasi ipsa esse explicabo numquam! Consequatur, in quibusdam. Deserunt fugit aliquid odio magni mollitia excepturi recusandae consequatur inventore itaque id! Minima?' WHERE item_id = 1;

