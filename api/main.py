from flask import Flask, request, render_template, session, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import sqlite3
from flask_cors import CORS
import json
import datetime
from database import init_db
from helper import to_dict


init_db()
app = Flask(__name__)
app.secret_key = "test"
CORS(app)


@app.route('/signin', methods=['POST'])
def signin():
    # print(request.data)
    request_data = request.data
    # print(request_data)
    cred = json.loads(request_data.decode('utf-8'))[0]
    # print(cred)
    # print(request_data['name'], request_data['password'])

    if "user_id" in session:
        return jsonify({"response": "success"})
    else:        
        with sqlite3.connect('prycey.db') as conn:
            c = conn.cursor()

            cred_query = c.execute("""
                                    SELECT user_id 
                                    FROM Users
                                    WHERE email = (?) AND password = (?);
                                    """, tuple(cred.values())).fetchone()

            if cred_query is not None:
                session["user_id"] = cred_query[0]
                # print(session["user_id"])
                return jsonify({"response": "success"})
            else:
                return jsonify({"response": "not found"})


@app.route('/signout')
def signout():
    if "user_id" in session:
        session.pop("user_id", None)
        print("session closed, client signed out")
    
    return jsonify({"response": "sign out success"})


@app.route('/signup', methods=['POST'])
def signup():
    """
        Registers new users into the users collection in db
    """
    request_data = request.data
    new_user = json.loads(request_data.decode('utf-8'))[0]
    print(new_user)

    with sqlite3.connect('prycey.db') as conn:
        c = conn.cursor()

        try:
            c.execute("""INSERT INTO Users(user_id, name, email, contact_number, password) 
                                VALUES(?,?,?,?,?)""", tuple(new_user.values()))
        except sqlite3.IntegrityError:
            return jsonify({"response": "error"})

        # return redirect("/signin")
        return jsonify({"response": "success"})


@app.route('/sell', methods=['POST'])
def sell():
    """
        Store form details
    """
    request_data = request.data
    new_item = json.loads(request_data.decode('utf-8'))[0]
    # print(new_item)

    if "user_id" in session:

        new_prod = (session["user_id"], ) + tuple(new_item.values()) + (str(datetime.date.today()), )
        print(new_prod)
        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()

            c.execute("""
                        INSERT INTO Items(seller_id, title, description, c_id, price, year, im1, im2, im3, im4, date_added)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?);
                        """, new_prod)

            return jsonify({"response": "SUCCESS"})
    else:
        return jsonify({"response": "NOT_SIGNED_IN"})


@app.route('/search', methods=["GET", "POST"])
def search():
    """
        Gets search query '?q=' for name
        Gets search other query options like sort, price range, category
    """
    if request.method =='GET':
        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()
            results = c.execute("""
                                    SELECT * FROM Items;
                                    """).fetchall()
            return to_dict(results)
            
    elif request.method=='POST':
        request_data = request.data
        query = json.loads(request_data.decode('utf-8'))[0]
        print(query)

        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()

            print(query.get("q"))

            if query.get("q") == "":
                results = c.execute("""
                                    SELECT * FROM Items;
                                    """).fetchall()
            else:
                results = c.execute("""
                                    SELECT * FROM Items WHERE title LIKE (?);
                                    """, ('%' + query.get("q") + '%', )).fetchall()
        print(results)
        return jsonify(results)


# @app.route('/users')
# def render_users():
#     with sqlite3.connect("prycey.db") as conn:
#         c = conn.cursor()
#         users = c.execute("""SELECT * FROM Users""").fetchall()
#         return jsonify(users)


@app.route('/dashboard')
def render_dashboard():
    if "user_id" in session:
        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()
            details = c.execute("""
                                    SELECT user_id, name, email, contact_number
                                    FROM Users 
                                    WHERE user_id = (?);
                                """, (session['user_id'],)).fetchone()
            user_posts = c.execute("""
                                    SELECT *
                                    FROM Items 
                                    WHERE seller_id = (?)
                                """, (session['user_id'],)).fetchall()
            print(details)
            print(user_posts)

            req = details + tuple(user_posts)
            return jsonify(req)
    else:
        return jsonify({"response": "NOT_SIGNED_IN"})


@app.route('/product/<int:id>')
def render_product_page(id):
    with sqlite3.connect("prycey.db") as conn:
        c = conn.cursor()

        # product_query = c.execute("""
        #                             SELECT title, c_id, description, price, year, added_date, rating FROM Items, UserRating
        #                             WHERE Items.seller_id=UserRating.user_id AND Items.item_id = (?)
        #                             """, (id,)).fetchall()

        product_query = c.execute("""
                                    SELECT title, c_id, description, price, year, date_added, im1, im2, im3, im4 FROM Items, Users
                                    WHERE Items.seller_id=Users.user_id AND Items.item_id = (?)
                                    """, (id,)).fetchone()

        print(product_query)

    return to_dict(product_query)


@app.route('/product/<int:id>/edit', methods=['POST'])
def edit_product(id):
    """
        Edits 
    """

    if "user_id" in session:
        request_data = request.data
        new_item = json.loads(request_data.decode('utf-8'))[0]
        print(new_item)

        with sqlite3.connect('prycey.db') as conn:
            c = conn.cursor()

            k = c.execute("""SELECT seller_id FROM Items WHERE item_id = ?""", (id, )).fetchone()
            print(k)
            if k[0] == session["user_id"]:
                # edit = request_data
                c.execute("""UPDATE Items
                            SET 
                            title = ?,
                            description = ?,
                            c_id = ?,
                            price = ?,
                            year = ?,
                            im1 = ?,
                            im2 = ?,
                            im3 = ?,
                            im4 = ?

                            WHERE item_id = ?
                            """, tuple(list(new_item.values()) + [id]))
                conn.commit()

                return jsonify({"response": "SUCCESS_EDIT"})
            else:
                return jsonify({"response": "NOT_AUTHORIZED"})
    else:
        return jsonify({"response": "NOT_SIGNED_IN"})
            

@app.route('/product/<int:id>/delete')
def delete_product(id):
    if "user_id" in session:
        with sqlite3.connect('prycey.db') as conn:
            c = conn.cursor()

            k = c.execute("""SELECT seller_id FROM Items WHERE item_id = ?""", (id, )).fetchone()
            
            if k[0] == session["user_id"]:
                c.execute("""DELETE FROM Items WHERE item_id = ?""", (id, ))
                conn.commit()
                return jsonify({"response": "SUCCESS_DELETE"})

            else:
                return jsonify({"response": "NOT_AUTHORIZED"})
    else:
        return jsonify({"response": "NOT_SIGNED_IN"})


@app.route('/upload', methods=['POST'])
def upload():
    t = request.files['file']
    t.save(t.filename)
    
    print(t)
    return "done"
