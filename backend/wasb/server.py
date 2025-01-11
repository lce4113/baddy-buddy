
from flask import Flask

app = Flask(__name__)

import argparse
import os
import sys

# Import inference functions from other scripts
# from inference_scripts.deepball_inference import run_inference as deepball_inference
# from inference_scripts.deepball_large_inference import run_inference as deepball_large_inference
# from inference_scripts.ballseg_inference import run_inference as ballseg_inference
# from inference_scripts.monotrack_inference import run_inference as monotrack_inference
# from inference_scripts.restracknetv2_inference import run_inference as restracknetv2_inference
# from inference_scripts.tracknetv2_inference import run_inference as tracknetv2_inference
from inference_scripts.wasb_inference import run_inference as wasb_inference


# Map models to their corresponding inference functions
MODEL_INFERENCE_MAP = {
    # "deepball": deepball_inference,
    # "deepball-large": deepball_large_inference,
    # "ballseg": ballseg_inference,
    # "monotrack": monotrack_inference,
    # "restracknetv2": restracknetv2_inference,
    # "tracknetv2": tracknetv2_inference,
    "wasb": wasb_inference,
}

def detect(input):
    # Check if input is a file or folder
    if not os.path.exists(input):
        print(f"Error: The input path '{input}' does not exist.")
        sys.exit(1)

    # Select the appropriate inference function
    inference_function = MODEL_INFERENCE_MAP["wasb"]

    # Run the selected inference function with the provided arguments
    inference_function(weights="badminton", input_path=input, overlay=False)


@app.route("/")
def hello_world():
    detect(input="test_videos/input.mov")
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run()
