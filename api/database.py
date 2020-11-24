import sqlite3

def init_db():
    conn = sqlite3.connect('prycey.db')
    c = conn.cursor()

    # Create Item Table
    c.execute("""CREATE TABLE IF NOT EXISTS Items(
                item_id INTEGER PRIMARY KEY,
                title TEXT,
                category INTEGER,
                description TEXT,
                price REAL,
                year INTEGER,
                seller_id INTEGER,
                added_date TEXT,
                image BLOB)""")
    conn.commit()


    # Create Users Table
    c.execute("""CREATE TABLE IF NOT EXISTS Users(
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                password TEXT,
                name TEXT,
                email TEXT,
                contact_number TEXT,
                profile_img BLOB)""")
    conn.commit()


    # Create user_rating Table
    c.execute("""CREATE TABLE IF NOT EXISTS UserRating(
                user_id INTEGER PRIMARY KEY,
                rating REAL)""")
    conn.commit()


    c.close()
    conn.close()
