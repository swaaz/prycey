from flask import Flask, request, render_template, session, redirect, url_for
import pymongo
from flask_cors import CORS
import json
from bson import json_util

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["pryceydb"]
item_stock = db["items"]
users = db["users"]

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
        
        cred_query = users.find(cred, {"_id": 1})

        if cred_query.count() == 1:
            session["user_id"] = str(cred_query[0]["_id"])
            print(session["user_id"])
            return redirect('/')
        else:
            return "something failed"


@app.route('/signup')
def render_signup():
    return render_template("signup.html")


@app.route('/signup_button', methods=['POST'])
def signup():
    """
        Registers new users into the users collection in db
    """

    new_user = {
        "username": request.form.get("username"),
        "full_name": request.form.get("full_name"),
        "email": request.form.get("email"),
        "contact": request.form.get("contact"),

        # Pending Encrypt the password before storing in db
        "password": request.form.get("password")
    }

    email_query = { "email": request.form.get("email")}
    email_request = users.find(email_query, {"_id": 0, "email": 1})

    if email_request.count() > 0:
        # return message like email already exists
        return "error, email already taken"
    else:
        users.insert_one(new_user)
        return "sucess"


@app.route('/sell')
def render_sell():
    return render_template("sell.html")


@app.route('/sell_button', methods=['POST'])
def sell():
    """
        Store form details
    """
    new_item = {
        "seller_id": request.args.get("seller_id"),
        "title": request.form.get("title"),
        "description": request.form.get("description"),
        "category": request.form.get("category"),
        "price": request.form.get("price"),
        "year": request.form.get("year")
        # handle input images
    }

    # pending error check inputs
    item_stock.insert_one(new_item)

    return "success"


@app.route('/search', methods=["POST"])
def search():
    """
        Gets search query '?q=' for name
        Gets search other query options like sort, price range, category
    """
    new_query = { "title": request.form.get("q")}

    if request.form.get("q") != '':
        results = item_stock.find(new_query)
    else:
        results = item_stock.find()

    return render_template("search.html", items=results)


@app.route('/users')
def render_users():
    return render_template("users.html", users=users.find())


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
