from flask import Flask, render_template, session, request
from flask.ext.socketio import SocketIO, emit, join_room
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['FLASK_DEBUG'] = 1
socketio = SocketIO(app)

import eventlet
eventlet.monkey_patch()

@app.route('/')
def chat():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@socketio.on('message', namespace='/chat')
def chat_message(message):
    print(message['data']['message'])
    print(classify(message['data']['message']))
    emit('bot_message',{'data': response(message['data']['message'])}, broadcast = True)

@socketio.on('connect', namespace='/chat')
def test_connect():
    emit('my response', {'data': 'Connected', 'count':0})

if __name__ == '__main__':
    CORS(app)
    socketio.run(app,host='0.0.0.0', debug = True)