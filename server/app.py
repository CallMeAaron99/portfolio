import os
from http import HTTPStatus

from flask import Flask, request, Response, send_from_directory, render_template, make_response
from flask_mail import Mail, Message
from werkzeug.routing import BaseConverter

class LangConverter(BaseConverter):
    regex = r'[a-z]{2}-[A-Z]{2}'

app = Flask(__name__)
app.url_map.converters['lang'] = LangConverter
app.config.from_pyfile('config.py')
mail = Mail(app)

static_dir = os.path.join(app.root_path, 'static')

@app.route('/')
def index():
    lang = request.cookies.get('lang')
    if not lang:
        supported_languages = ["en", "zh"]
        lang = request.accept_languages.best_match(supported_languages)
        if lang == 'zh':
            if request.accept_languages[0][0] in ['zh-TW', 'zh-HK']:
                lang = 'zh-TW'
            else:
                lang = 'zh-CN'
        else:
            lang = 'en-US'
    return template_serve(lang)

@app.route('/<lang:lang>')
def template_serve(lang):
    resp = make_response(render_template(lang + '/index.html'))
    cookieLang = request.cookies.get('lang')
    if not cookieLang or cookieLang != lang:
        resp.set_cookie('lang', lang)
    return resp

@app.route('/<lang>/<path:filename>')
def static_files(lang, filename):
    return send_from_directory(os.path.join(static_dir, lang), filename)

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
