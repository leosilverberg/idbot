
# coding: utf-8

# In[2]:


import nltk
from nltk.stem.lancaster import LancasterStemmer

stemmer = LancasterStemmer()

import numpy as np
import tflearn
import tensorflow as tf
import random

from flask import Flask, request, abort


# In[2]:


# restore all of our data structures
import pickle
data = pickle.load( open( "training_data", "rb" ) )
words = data['words']
classes = data['classes']
train_x = data['train_x']
train_y = data['train_y']

# import our chat-bot intents file
import json
with open('intents.json') as json_data:
    intents = json.load(json_data)


# In[3]:


# Build neural network
net = tflearn.input_data(shape=[None, len(train_x[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax')
net = tflearn.regression(net)

# Define model and setup tensorboard
model = tflearn.DNN(net, tensorboard_dir='tflearn_logs')


# In[4]:


# load our saved model
model.load('./model.tflearn')


# In[5]:


def clean_up_sentence(sentence):
    # tokenize the pattern
    sentence_words = nltk.word_tokenize(sentence)
    # stem each word
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words

# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=False):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)

    return(np.array(bag))


# In[6]:


ERROR_THRESHOLD = 0.25
def classify(sentence):
    # generate probabilities from the model
    results = model.predict([bow(sentence, words)])[0]
    # filter out predictions below a threshold
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], r[1]))
    # return tuple of intent and probability
    return return_list

def response(sentence, userID='123', show_details=False):
    results = classify(sentence)
    # if we have a classification then find the matching intent tag
    if results:
        # loop as long as there are matches to process
        while results:
            for i in intents['intents']:
                # find a tag matching the first result
                if i['tag'] == results[0][0]:
                    # a random response from the intent
                    # print(random.choice(i['responses']))
                    return random.choice(i['responses'])

            results.pop(0)


# In[7]:





# In[ ]:




from flask import Flask, render_template, session, request
from flask.ext.socketio import SocketIO, emit, join_room
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
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
    print('u-message:'+message['data']['message'])
    print('b-classify:'+classify(message['data']['message']))
    emit('bot_message',{'data': response(message['data']['message'])}, broadcast = True)

@socketio.on('connect', namespace='/chat')
def test_connect():
    emit('my response', {'data': 'Connected', 'count':0})

if __name__ == '__main__':
    CORS(app)
    socketio.run(app,host='0.0.0.0', debug = False)

