from flask import Flask, request, render_template
import pymongo
from flask_cors import CORS
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["pryceydb"]
item_stock = db["items"]
users = db["users"]

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/signin', methods=['POST'])
def signin():
    print(request.data)
    request_data = request.data
    request_data = json.loads(request_data.decode('utf-8'))
    # print(request_data['name'], request_data['password'])
    return "REturn"


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

    print(users.find())
    if request.form.get("email") in users.find({}, {"email": 1}):
        # return message like email already exists
        return "error"
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

    results = item_stock.find(new_query)
    
    return render_template("search.html", items=results)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
