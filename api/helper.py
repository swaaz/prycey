import json
import smtplib
import imghdr
import os
from email.message import EmailMessage
from dotenv import load_dotenv
from pathlib import Path

def to_dict(k: list):
	d = []

	for i in range(len(k)):
		d.append({
			"item_id": k[i][0],
			"title": k[i][1],
			"description": k[i][2],
			"price": k[i][3],
			"year": k[i][4],
			"date_added": k[i][5],
			"im1": k[i][6],
			"im2": k[i][7],
			"im3": k[i][8],
			"im4": k[i][9],
			"c_id": k[i][10],
			"seller_id": k[i][11]
		})

	return d

def rate_to_dict(k: list):
	d = []

	for i in range(len(k)):
		d.append({
			"name": k[i][0],
			"user_id": k[i][1],
			"rating": k[i][2],
			"profile_img": k[i][3]
		})

	return d

def mail(email_id: str, buyer_id: str, buyer_email: str, buyer_name: str, item_name: str):
	env_path = Path('.') / '.env'
	load_dotenv(dotenv_path=env_path)

	maildid = os.environ.get('EMAILID')  #enter your email id here
	password = os.environ.get('PASSWORD') #enter your password here
	print(maildid)
	print(password)

	contact = email_id

	message = EmailMessage()
	message['From'] = maildid
	message['To'] = contact
	message['Subject'] = f'New interest! {buyer_id} is interested in purchasing your item' #replace the subject  

	message.set_content(f"Your item {item_name} is requested by new buyer {buyer_name}, {buyer_id}.\nTo contact the buyer use buyer's email id: {buyer_email}\n") 

	# Sending mails
	with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
		smtp.login(maildid, password)
		smtp.send_message(message)
		
		# if the mail is Successfully sent then this statement will be printed
		print("Mail sent Successfully to {}".format(contact))
			
	print("\nSuccessfully sent!!!")