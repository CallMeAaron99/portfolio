import os
from http import HTTPStatus

from flask import Flask, request, Response, send_from_directory, render_template
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_pyfile('config.py')
mail = Mail(app)

static_dir = os.path.join(app.root_path, 'static')

@app.route('/')
@app.route('/<lang_code>')
def index(lang_code='en-US'):
    return send_from_directory(os.path.join(static_dir, lang_code), 'index.html')

@app.route('/<lang_code>/<path:filename>')
def static_files(lang_code, filename):
    return send_from_directory(os.path.join(static_dir, lang_code), filename)

@app.route('/email', methods=['POST'])
def send_email():
    data = request.get_json()
    html = render_template('email.html', data=data)
    msg = Message(
        "Contact Message",
        sender = data['email'],
        recipients = ['aaron.dev247@gmail.com'],
        body = data['message'],
        html = html
    )
    mail.send(msg)
    return Response(status=HTTPStatus.NO_CONTENT)
