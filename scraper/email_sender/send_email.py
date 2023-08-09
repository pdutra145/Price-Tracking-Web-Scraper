import emails
import json
from bs4 import BeautifulSoup
from datetime import datetime

with open('email_sender/mailtrap_creds.json') as f:
    cred = json.load(f)

with open('email_sender/email.html') as f:
    template = f.read()

soup = BeautifulSoup(template, 'html.parser')


def send_email(sender, to, subject, content):
    h1_tag = soup.find('h1')
    h1_tag.string = content["title"]

    p_tag = soup.find('p')
    p_tag.string = content["message"]

    date_tag = soup.find(attrs={'class': 'date'})
    date_tag.string = datetime.now().strftime('%Y-%m-%d')

    message = emails.Message(
        subject=subject,
        html=soup.prettify(),
        # replace with your name and email
        mail_from=(sender["name"], sender["email"])
    )

    r = message.send(
        to=to["email"],  # replace with recipient email
        smtp={'host': cred["HOST"], 'port': cred["PORT"],
              # replace with your Mailtrap's username
              'user': cred["USERNAME"],
              # replace with your Mailtrap's password
              'password': cred["PASSWORD"],
              'tls': True})

    return 200


if __name__ == '__main__':
    # Testing
    send_email({"name": "pedro", "email": 'ppmdutra@gmail.com'},
               'test@test.com', 'TEST', {'title': "Price Tracker", "message": "My message"})
