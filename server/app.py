import os
from http import HTTPStatus

from flask import Flask, request, Response, send_from_directory, render_template, session
from flask_mail import Mail, Message
from werkzeug.routing import BaseConverter

class LangCodeConverter(BaseConverter):
    regex = r'[a-z]{2}-[A-Z]{2}'

app = Flask(__name__)
app.url_map.converters['lang_code'] = LangCodeConverter
app.config.from_pyfile('config.py')
mail = Mail(app)

static_dir = os.path.join(app.root_path, 'static')

@app.route('/')
def index():
    lang_code = session.get('lang_code')
    if not lang_code:
        supported_languages = ["en", "zh"]
        lang = request.accept_languages.best_match(supported_languages)
        if lang == 'zh':
            if request.accept_languages[0][0] in ['zh-TW', 'zh-HK']:
                lang_code = 'zh-TW'
            else:
                lang_code = 'zh-CN'
        else:
            lang_code = 'en-US'
    return template_serve(lang_code)

@app.route('/<lang_code:lang_code>')
def template_serve(lang_code):
    session['lang_code'] = lang_code
    return render_template(lang_code + '/index.html')

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

if __import__ == '__main__':
    app.run()
