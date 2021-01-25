from flask import Flask, request, render_template, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import sqlite3
from flask_cors import CORS
import json
import datetime
import os
# from database import init_db
from helper import to_dict, rate_to_dict, mail

db = 'prycey.db'
UPLOAD_FOLDER = '../public/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


# init_db()
app = Flask(__name__)
app.secret_key = "test"
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

sess = dict()


def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/checkauth')
def check_signin():
	if "user_id" in sess:
		return {"response": True}
	else:
		return {"response": False}


@app.route('/signin', methods=['POST'])
def signin():
	"""
		Signin API 

		/signin

		Usage:

			Send a POST Request to flask server with JSON data of the form:
			{
				"username": "value",
				"password": "value"
			}

		Returns:
			If success:
				{
					"response": "Signin Success"
				}
			If wrong credentials:
				{
					"response": "No Credential found"
				}
			If already session exists:
				{
					"response": "Already Signed in :)"
				}
	"""
	global sess
	if request.method == 'POST':
		print(sess.get('user_id'))

		# print(request.data)
		request_data = request.data
		# print(request_data)
		cred = json.loads(request_data.decode('utf8').replace("'", '"'))
		# cred = {
		#     "username": request.form.get('username'),
		#     "password": request.form.get('password')
		# }
		print(cred)
		# print(request_data['name'], request_data['password'])

		if "user_id" in sess:
			print("Already Signed in :)")
			return json.dumps({"response": "Already Signed in :)"})
		else:
			with sqlite3.connect(db) as conn:
				c = conn.cursor()
				c.execute("PRAGMA FOREIGN_KEYS=ON;")

				cred_query = c.execute(
					""" 
					SELECT user_id FROM Users
					WHERE 
					user_id = (?) AND password = (?);
					""", tuple(cred.values())).fetchone()

				if cred_query is not None:
					sess["user_id"] = cred_query[0]
					print(sess["user_id"])
					print("Signin Success")
					return json.dumps({"response": "Signin Success"})
				else:
					print("No Credential found")
					return json.dumps({"response": "No Credential found"})


@app.route('/signout')
def signout():
	"""
		Signout API:

		/signout

		Send a simple GET request to current session value

		Returns:

			If success:
				{
					"response": "Successfully signed out"
				}
			If no session exists:
				{
					"response": "Not signed in"
				}

	"""

	if "user_id" in sess:
		sess.pop("user_id", None)
		print("sess closed, Client Signed out")

		return json.dumps({"response": "Successfully signed out"})
	else:
		return json.dumps({"response": "Not signed in"})


@app.route('/signup', methods=['POST'])
def signup():
	"""
		Registers new users into the users collection in db

		/signup

		Usage:
			Send a POST request to the server with the JSON data of the form:

			{
				"user_id": "value",
				"name": "value",
				"email": "value",
				"contact_number": "value",
				"password": "value",
			}

		Returns:
			If successfully registered:
				{
					"response": "Account created successfully!"
				}
			If username/email already taken:
				{
					"response": "Already Exists!"
				}
	"""
	# request_data = request.data
	# print(request_data)
	# new_user = json.loads(request_data.decode('utf-8').replace("'", '"'))
	# print(new_user)

	# request_data = request.data
	# new_user = json.loads(request_data.decode('utf8').replace("'", '"'))

	# print(request_data)

	new_user = {
	    "user_id": request.form.get('user_id'),
	    "name": request.form.get('name'),
	    "email": request.form.get('email'),
	    "contact_number": request.form.get('contact_number'),
	    "password": request.form.get('password')
	}

	# print(new_user)

	with sqlite3.connect(db) as conn:
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'] + '/profile', filename))

		c = conn.cursor()
		c.execute("PRAGMA FOREIGN_KEYS=ON;")

		k = list(new_user.values()) + [filename]
		print(k)

		try:
			c.execute("""INSERT INTO Users(user_id, name, email, contact_number, password, profile_image) 
								VALUES(?,?,?,?,?,?)""", tuple(k))
			print("success")
		except sqlite3.IntegrityError:
			# print("Already there error")
			return json.dumps({"response": "Already Exists!"})

		# return redirect("/signin")

		return json.dumps({"response": "Account created successfully!"})


@app.route('/sell', methods=['POST'])
def sell():
	"""
		Store form details
	"""

	# print(file)

	if "user_id" in sess:
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'] + '/product', filename))

		print(filename)
		new_prod = {
			"seller_id": sess["user_id"],
			"title": request.form.get("title"),
			"description": request.form.get("description"),
			"c_id": int(request.form.get("category")),
			"price": float(request.form.get("price")),
			"year": int(request.form.get("year")),
			"im1": str(filename),
			"im2": " ",
			"im3": " ",
			"im4": " ",
			"date_added": str(datetime.date.today())
		}
		print(new_prod)
		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")

			try:
				c.execute(
					"""
					INSERT INTO Items
					(seller_id, title, description, 
					c_id, price, year, im1, im2, im3, im4, date_added)
					VALUES(?,?,?,?,?,?,?,?,?,?,?);
					""", tuple(new_prod.values()))
			except sqlite3.IntegrityError:
				return json.dumps({"response": "Category not found"})

			return json.dumps({"response": "Successfully posted"})
	else:
		return json.dumps({"response": "Please Signin"})

	return "done"


@app.route('/search', methods=["GET", "POST"])
def search():
	"""
			Gets search query '?q=' for name
			Gets search other query options like sort, price range, category
	"""

	if request.method == 'GET':
		query = request.args.get('q')

		# print(query)

		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")

			# print(query)

			if query == None:
				results = c.execute("""
									SELECT * FROM Items;
									""").fetchall()
			else:
				results = c.execute("""
									SELECT * FROM Items WHERE title LIKE (?);
									""", ('%' + query + '%', )).fetchall()
		# print(results)
		return json.dumps(to_dict(results))


# @app.route('/users')
# def render_users():
#     with sqlite3.connect(db) as conn:
#         c = conn.cursor()
#         users = c.execute("""SELECT * FROM Users""").fetchall()
#         return jsonify(users)


@app.route('/dashboard')
def render_dashboard():
	global sess
	print(sess.get('user_id'))
	if "user_id" in sess:
		print(sess.get('user_id'))

		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")
			details = c.execute("""
								SELECT Users.user_id, name, rating, no_of_ratings, profile_image
								FROM Users, User_Rating
								WHERE Users.user_id=User_rating.user_id AND Users.user_id = (?);
							""", (sess.get('user_id'),)).fetchone()
			user_posts = c.execute("""
									SELECT *
									FROM Items 
									WHERE seller_id = (?)
								""", (sess.get('user_id'),)).fetchall()
			user_rating = c.execute("""
										SELECT name, rated_id, rating, profile_image
										FROM Rated, Users 
										WHERE Rated.rated_id=Users.user_id AND Rated.user_id=?
									""", (sess.get('user_id'),)).fetchall()
			print(details)
			# print(user_posts)
			user_posts = to_dict(user_posts)
			user_rating = rate_to_dict(user_rating)
			fname, lname = details[1].split()
			req = {
				"user_id": details[0],
				"fname": fname,
				"lname": lname,
				"rating": details[2],
				"no_of_ratings": details[3],
				"posts": user_posts,
				"ratings": user_rating,
				"profile_image": details[4]
			}

			# req = details + to_dict(user_posts)
			return json.dumps(req)
	else:
		return json.dumps({"response": "Please Sign in"})


@app.route('/product/<int:id>')
def render_product_page(id):
	with sqlite3.connect(db) as conn:
		c = conn.cursor()
		c.execute("PRAGMA FOREIGN_KEYS=ON;")
		# product_query = c.execute("""
		#                             SELECT title, c_id, description, price, year, added_date, rating FROM Items, UserRating
		#                             WHERE Items.seller_id=UserRating.user_id AND Items.item_id = (?)
		#                             """, (id,)).fetchall()

		product_query = c.execute("""
									SELECT Items.*, profile_image, email, contact_number, name, rating, no_of_ratings, cat_name
									FROM Items, User_Rating, Users, Category
									WHERE 
									Items.seller_id=Users.user_id 
									AND 
									Items.seller_id=User_Rating.user_id
									AND  
									Category.cat_id=Items.c_id
									AND Items.item_id = (?)
									""", (id,)).fetchall()

		print(product_query)
		k = to_dict(product_query)[0]
		k["profile_image"] = product_query[0][-7]
		k["email"] = product_query[0][-6]
		k["contact"] = product_query[0][-5]
		k["seller_name"] = product_query[0][-4]
		k["rating"] = product_query[0][-3]
		k["no_of_rating"] = product_query[0][-2]
		k["category"] = product_query[0][-1]
		# print(k)

	return json.dumps(k)


@app.route('/product/edit/<int:id>', methods=['POST'])
def edit_product(id):
	"""
			Edits 
	"""

	if "user_id" in sess:
		request_data = request.data
		new_item = json.loads(request_data.decode('utf8').replace("'", '"'))
		# print(new_item)

		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")

			k = c.execute(
				"""SELECT seller_id FROM Items WHERE item_id = ?""", (id, )).fetchone()
			# print(k)
			print(list(new_item.values())[:-2] + [id])
			if k[0] == sess["user_id"]:
				c.execute("""UPDATE Items
							SET 
							title = ?,
							description = ?,
							price = ?,
							year = ?

							WHERE item_id = ?
							""", tuple(list(new_item.values())[:-2] + [id]))
				conn.commit()

				return json.dumps({"response": "Successfuly edited post"})
			else:
				return json.dumps({"response": "Cannot edit!"})
	else:
		return json.dumps({"response": "Please signin"})


@app.route('/product/<int:id>/delete')
def delete_product(id):
	if "user_id" in sess:
		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")

			k = c.execute(
				"""SELECT seller_id FROM Items WHERE item_id = ?""", (id, )).fetchone()

			if k[0] == sess['user_id']:
				c.execute("""DELETE FROM Items WHERE item_id = ?""", (id, ))
				conn.commit()
				return json.dumps({"response": "Successfully deleted"})

			else:
				return json.dumps({"response": "Not Allowed!"})
	else:
		return json.dumps({"response": "Please Signin"})


@app.route('/product/category/<int:cid>')
def prod_cat(cid):
	with sqlite3.connect(db) as conn:
		c = conn.cursor()
		c.execute("PRAGMA FOREIGN_KEYS=ON;")

		query = c.execute(
			"""SELECT Items.*, cat_name FROM Items, Category WHERE Items.c_id=Category.cat_id and c_id=?""", (cid,)).fetchall()
		# cat = c.execute("""SELECT cat_name FROM Category WHERE cat_id=?""", (cid,))

		# print(query)
		q = to_dict(query)
		for k in q:
			k["category"] = query[0][-1]

		return json.dumps(q)


@app.route('/rating/<string:uid>', methods=['POST'])
def rate(uid):
	"""
		/rating

		Send a post request for adding/updating the review
		{
			'rating': 5,
			'review': 'very good'
		}
	"""

	# request_data = request.data
	# rate_review = json.loads(request_data.decode('utf8').replace("'", '"'))

	# print(uid)
	# print(rate_review)
	print(request.form.get('rating'))
	print(request.form.get('review'))
	nr = int(request.form.get('rating'))
	review = request.form.get('review')
	print(uid)

	if "user_id" in sess:
		if 1 <= nr <= 5:
			with sqlite3.connect(db) as conn:
				c = conn.cursor()
				c.execute("PRAGMA FOREIGN_KEYS=ON;")

				try:
					c.execute("""INSERT INTO Rated(user_id, rated_id, rating, review) 
								VALUES(?,?,?,?);
								""", (sess["user_id"], uid, nr, review))
					conn.commit()
				except sqlite3.IntegrityError:
					c.execute("""UPDATE Rated SET rating=?, review=? WHERE user_id=? AND rated_id=?;
								""", (nr, review, sess["user_id"], uid, ))
					conn.commit()

				return json.dumps({"response": "Successfully rated user"})
		else:
			return json.dumps({"response": "Given rating too high"})
	else:
		return json.dumps({"response": "Please signin"})


@app.route('/rating/delete/<string:uid>')
def del_rate(uid):
	if "user_id" in sess:
		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")
			c.execute("""DELETE FROM Rated 
						WHERE user_id=? AND rated_id=?
					""", (sess['user_id'], uid,))
			return json.dumps({"response": "Successfully deleted the rating"})
	else:
		return json.dumps({"response": "Please signin"})


@app.route('/transact', methods=['POST'])
def transaction():

	# request_data = request.data
	# rate_review = json.loads(request_data.decode('utf8').replace("'", '"'))
	seller_id = request.form.get('seller')
	item_id = request.form.get('id')
	now = datetime.datetime.now()
	dt_str = now.strftime("%d/%m/%Y %H:%M:%S").split()
	date = dt_str[0]
	time = dt_str[1]

	if "user_id" in sess:
		with sqlite3.connect(db) as conn:
			c = conn.cursor()
			c.execute("PRAGMA FOREIGN_KEYS=ON;")
			c.execute("""INSERT INTO Transact 
						(seller_id, buyer_id, item_id, date, time)
						VALUES(?,?,?,?,?)
					""", (seller_id, sess['user_id'], item_id, date, time))

			buyer_email, buyer_name = c.execute("""SELECT email, name 
				FROM USERS 
				WHERE user_id=?""", (sess['user_id'],)).fetchone()

			seller_email = c.execute("""SELECT email 
				FROM USERS 
				WHERE user_id=?""", (seller_id,)).fetchone()
			item_name = c.execute(
				"""SELECT title FROM Items WHERE item_id=?""", (item_id,)).fetchone()

			mail(email_id=seller_email, buyer_id=sess['user_id'], buyer_email=buyer_email, buyer_name=buyer_name, item_name=item_name)

			return json.dumps({"response": "Transaction complete"})
	else:
		return json.dumps({"response": "Please signin"})

# if __name__ == "__main__":
#     app.run(debug=True)
