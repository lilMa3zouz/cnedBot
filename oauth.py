import sys
from multiprocessing import Process
from flask import Flask, request
from flask_cors import cross_origin
import webbrowser
import time


def shutdown_server():
       func = request.environ.get('werkzeug.server.shutdown')
       if func is None:
           raise RuntimeError('Not running with the Werkzeug Server')
       func()

app = Flask(__name__)

@app.route("/cv",methods=['GET'])
def calc():
    data = request.get_json()
    return "data"
    


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001, debug=True)