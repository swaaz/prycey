
import sqlite3


def init_db():
	conn = sqlite3.connect("prycey.db")
	c = conn.cursor()

	c.execute("PRAGMA FOREIGN_KEYS=ON;")
	conn.commit()

	# Create ITEM Table
	c.execute(
		"""CREATE TABLE IF NOT EXISTS Items(
				item_id INTEGER PRIMARY KEY,
				title TEXT NOT NULL,
				description TEXT NOT NULL,
				price REAL NOT NULL,
				year INTEGER NOT NULL,
				date_added TEXT NOT NULL,
				im1 TEXT NOT NULL,
				im2 TEXT,
				im3 TEXT,
				im4 TEXT);"""
	)
	conn.commit()

	# Create USER Table
	c.execute(
		"""CREATE TABLE IF NOT EXISTS Users(
				user_id TEXT PRIMARY KEY,
				password TEXT NOT NULL,
				name TEXT NOT NULL,
				email TEXT UNIQUE NOT NULL,
				contact_number TEXT NOT NULL,
				profile_image BLOB);"""
	)
	conn.commit()

	 # Create CATEGORY Table
	c.execute(
		"""CREATE TABLE IF NOT EXISTS Category(
				cat_id INTEGER PRIMARY KEY,
				cat_name TEXT NOT NULL,
				cat_desc TEXT NOT NULL);"""
	)
	conn.commit()

	# Create USER_RATING Table
	c.execute(
		"""CREATE TABLE IF NOT EXISTS User_Rating(
				user_id TEXT PRIMARY KEY,
				rating REAL DEFAULT 0.0 CHECK(rating <= 5),
				no_of_ratings INTEGER DEFAULT 0,
				FOREIGN KEY(user_id) REFERENCES Users(user_id)
				ON DELETE CASCADE);"""
	)
	conn.commit()

	# Create TRANSACTION Table
	c.execute(
		"""CREATE TABLE IF NOT EXISTS Transact(
				transaction_id INTEGER PRIMARY KEY,
				seller_id TEXT NOT NULL,
				buyer_id TEXT NOT NULL,
				item_id INTEGER NOT NULL,
				date TEXT NOT NULL,
				time TEXT NOT NULL,
				FOREIGN KEY(seller_id) REFERENCES Users(user_id),
				FOREIGN KEY(buyer_id) REFERENCES Users(user_id),
				FOREIGN KEY(item_id) REFERENCES Items(item_id));""")
	conn.commit()

	c.execute("""
				CREATE TABLE IF NOT EXISTS Rated(
					user_id TEXT,
					rated_id TEXT,
					review TEXT,
					rating REAL,
					PRIMARY KEY(user_id, rated_id),
					FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
					FOREIGN KEY(rated_id) REFERENCES Users(user_id) ON DELETE CASCADE);""")
	conn.commit()
 
	# Execute this only once
	c.execute("""
				ALTER TABLE Items ADD COLUMN c_id INTEGER
				REFERENCES Category(cat_id)
				ON DELETE CASCADE;""")
	conn.commit()

	c.execute("""
				ALTER TABLE Items ADD COLUMN seller_id TEXT
				REFERENCES Users(user_id)
				ON DELETE CASCADE;""")
	conn.commit()

	c.execute("""
			CREATE TRIGGER add_user_rating AFTER INSERT ON Users
			BEGIN
				INSERT INTO User_Rating(user_id) VALUES(new.user_id);
			END;
		""")
	conn.commit()

	c.execute("""
			CREATE TRIGGER add_new_rated AFTER INSERT ON Rated
			BEGIN
				UPDATE User_Rating 
				SET rating=((rating * no_of_ratings + new.rating)/(no_of_ratings + 1)),
				no_of_ratings=(no_of_ratings + 1)
				WHERE user_id=new.rated_id;
			END;
		""")
	conn.commit()

	c.execute("""
			CREATE TRIGGER update_rating AFTER UPDATE ON Rated
			WHEN old.rating <> new.rating
			BEGIN
				UPDATE User_Rating
				SET rating=(rating * no_of_ratings - old.rating + new.rating)/(no_of_ratings)
				WHERE user_id=new.rated_id;
			END;
		""")
	conn.commit()

	c.execute("""
	        CREATE TRIGGER update_rating AFTER DELETE ON Rated
	        BEGIN
	            UPDATE User_Rating
	            SET rating=(rating * no_of_ratings - old.rating)/(no_of_ratings-1),
				no_of_ratings = (no_of_ratings - 1)
	            WHERE user_id=old.rated_id;
	        END;
	    """)
	conn.commit()

	

	c.close()
	conn.close()


init_db()