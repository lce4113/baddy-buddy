import sys
import os

from flask import Flask

sys.path.append(os.path.join(os.path.dirname(__file__), "wasb"))
from wasb.detect import detect

app = Flask(__name__)

@app.route("/")
def hello_world():
    detect(input="wasb/test_videos/input.mov")
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run()
