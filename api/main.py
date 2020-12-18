from flask import Flask, request, render_template, session, redirect, url_for
from werkzeug.utils import secure_filename
import sqlite3
from flask_cors import CORS
import json
from database import init_db


init_db()
app = Flask(__name__)
app.secret_key = "test"
CORS(app)

@app.route('/index')
@app.route('/')
def index():
    return render_template("index.html")


@app.route('/signin')
def render_signin():
    return render_template("signin.html")


@app.route('/signin_button', methods=['POST'])
def signin():
    # print(request.data)
    # request_data = request.data
    # request_data = json.loads(request_data.decode('utf-8'))
    # # print(request_data['name'], request_data['password'])

    if "user_id" in session:
        return redirect('/')
    else:
        cred = {
            "email" : request.form.get("email"),
            "password" : request.form.get("password")
        }
        
        with sqlite3.connect('prycey.db') as conn:
            c = conn.cursor()

            cred_query = c.execute("""
                                    SELECT user_id 
                                    FROM Users
                                    WHERE email = (?) AND password = (?);
                                    """, tuple(cred.values())).fetchone()

            if cred_query is not None:
                session["user_id"] = cred_query[0]
                print(session["user_id"])
                return redirect('/')
            else:
                return "signin failed, wrong email or password"


@app.route('/signout')
def signout():
    if "user_id" in session:
        session.pop("user_id", None)
        print("session closed, client signed out")
    
    return redirect('/')


@app.route('/signup')
def render_signup():
    return render_template("signup.html")


@app.route('/signup_button', methods=['POST'])
def signup():
    """
        Registers new users into the users collection in db
    """

    # request_data = request.data
    # request_data = json.loads(request_data.decode('utf-8'))

    new_user = {
        "username": request.form.get("username"),
        "full_name": request.form.get("full_name"),
        "email": request.form.get("email"),
        "contact": request.form.get("contact"),

        # Pending Encrypt the password before storing in db
        "password": request.form.get("password")
    }

    with sqlite3.connect('prycey.db') as conn:
        c = conn.cursor()

        email_query = c.execute("""
                                SELECT email 
                                FROM Users 
                                WHERE email = (?)""", (new_user['email'],)).fetchone()
        username_query = c.execute("""
                                    SELECT username 
                                    FROM Users 
                                    WHERE username = (?)
                                    """, (new_user['username'],)).fetchone()

        if email_query is not None:
            # return message like email already exists
            return "error, email already in use"
        else:
            if username_query is not None:
                return "error, username already taken"
            else:
                c.execute("""INSERT INTO 
                            Users(username, name, email, contact_number, password) 
                            VALUES(?,?,?,?,?)""", tuple(new_user.values()))
                return redirect("/signin")


@app.route('/sell')
def render_sell():
    if "user_id" in session:
        print(session["user_id"])
        return render_template("sell.html")
    else:
        return redirect("/signin")


@app.route('/sell_button', methods=['POST'])
def sell():
    """
        Store form details
    """
    # request_data = request.data
    # request_data = json.loads(request_data.decode('utf-8'))

    if "user_id" in session:
        new_item = {
            "seller_id": session["user_id"],
            "title": request.form.get("title"),
            "description": request.form.get("description"),
            "category": request.form.get("category"),
            "price": request.form.get("price"),
            "year": request.form.get("year")
            # handle input images
        }

        # pending error check inputs
        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()

            c.execute("""
                        INSERT INTO Items(seller_id, title, description, category, price, year)
                        VALUES(?,?,?,?,?,?);
                        """, tuple(new_item.values()))

            return "success"
    else:
        return redirect("/signin")


@app.route('/search/', methods=["POST"])
def search():
    """
        Gets search query '?q=' for name
        Gets search other query options like sort, price range, category
    """
    # request_data = request.data
    # request_data = json.loads(request_data.decode('utf-8'))

    new_query = {"title": request.form.get("q")}

    print(request.form.get("q"))

    with sqlite3.connect("prycey.db") as conn:
        c = conn.cursor()

        if request.form.get("q") == '':
            results = c.execute("""
                                SELECT * FROM Items;
                                """).fetchall()
        else:
            results = c.execute("""
                                SELECT * FROM Items WHERE title LIKE (?);
                                """, ('%' + list(new_query.values())[0] + '%', )).fetchall()
    
    print(results)

    return render_template("search.html", items=results)


@app.route('/users')
def render_users():
    with sqlite3.connect("prycey.db") as conn:
        c = conn.cursor()
        users = c.execute("""SELECT * FROM Users""").fetchall()
        return render_template("users.html", users=users)


@app.route('/dashboard')
def render_dashboard():
    if "user_id" in session:
        with sqlite3.connect("prycey.db") as conn:
            c = conn.cursor()
            details = c.execute("""
                                    SELECT username, name, email, contact_number
                                    FROM Users 
                                    WHERE user_id = (?)
                                """, (session['user_id'],)).fetchone()
            user_posts = c.execute("""
                                    SELECT *
                                    FROM Items 
                                    WHERE seller_id = (?)
                                """, (session['user_id'],)).fetchall()
            print(details)
            print(user_posts)
            return render_template("dashboard.html", details=details, user_posts=user_posts)
    else:
        return redirect("/signin")


@app.route('/product/<int:id>')
def render_product_page(id):
    with sqlite3.connect("prycey.db") as conn:
        c = conn.cursor()

        # product_query = c.execute("""
        #                             SELECT title, category, description, price, year, added_date, rating FROM Items, UserRating
        #                             WHERE Items.seller_id=UserRating.user_id AND Items.item_id = (?)
        #                             """, (id,)).fetchall()

        product_query = c.execute("""
                                    SELECT title, category, description, price, year, added_date FROM Items, Users
                                    WHERE Items.seller_id=Users.user_id AND Items.item_id = (?)
                                    """, (id,)).fetchone()

        print(product_query)

    return render_template("product_page.html", product=product_query)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
