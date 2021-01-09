import json
import smtplib
import imghdr
import os
import pandas as pd
from email.message import EmailMessage

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
		})

	return d

def mail(emal_id: str, buyer_id: str):
	maildid = ""  #enter your email id here
	password = "" #enter your password here

	files = []

	contacts = [email_id]

	for contact in contacts:
		message = EmailMessage()
		message['From'] = maildid
		message['To'] = contact
		message['Subject'] = f'New interest! {buyer_id} is interested in purchasing your item' #replace the subject  
		
		"""
		Note: if you want to send mail with content then use option 1 and delete the option 2
			or
			if you want to send HTML mail then use option 2 and delete option 1
		"""
		
		# option 1
		message.set_content('Enter the content here ') #this is optional. if you are using web mails then this is not necessary.

		# option 2
		message.add_alternative("""\    
			<!DOCTYPPE html>
				<html>
					<body>
					
						//Insert you html code here
						
					</body>
				</html>            
								""", subtype='html')
		

		# attaching files to the mail
		for file in files:
			with open(file, 'rb') as f:
				file_data = f.read()
				file_type = imghdr.what(f.name)
				file_name = f.name
			message.add_attachment(file_data, maintype='application', subtype='octect-stream', filename= file_name)
			
		# Sending mails
		with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
			smtp.login(maildid, password)
			smtp.send_message(message)
			
			# if the mail is Successfully sent then this statement will be printed
			print("Mail sent Successfully to {}".format(contact))
			
	print("\nSuccessfully sent!!!")
