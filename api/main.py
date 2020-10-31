from flask import Flask, request, render_template
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["pryceydb"]
item_stock = db["items"]
users = db["users"]

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("signup.html")


@app.route('/signin')
def signin():
    pass


@app.route('/signup', methods=['POST'])
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

    if request.form.get("email") in users.find({},{"email": 1}):
        # return message like email already exists
        return "error"
    else:
        users.insert_one(new_user)
    
    return "sucess"


@app.route('/sell', methods=['POST'])
def sell():
    """
        Store form details
    """
    new_item = {
        "seller_id": request.args.get("seller_id"),
        "title" : request.form.get("title"),
        "description" : request.form.get("description"),
        "category" : request.form.get("category"),
        "price" : request.form.get("price"),
        "year" : request.form.get("year")
        # handle input images
    }

    # pending error check inputs
    item_stock.insert_one(new_item)


@app.route('/search')
def search():
    """
        Gets search query '?q=' for name
        Gets search other query options like sort, price range, category
    """
    query = request.args.get("q")

    pass

if __name__ == '__main__':
    app.run(debug=True )