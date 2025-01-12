from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import pandas as pd
import subprocess
from threading import Thread

from src.tools.homography import CourtHomography
from src.tools.result_fetcher import fetch_ball_result, fetch_court_result, fetch_player_result

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

UPLOAD_FOLDER = 'videos'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def run_video_processing():
    print("running video processing")
    command = [
        "python", "main.py",
        "--folder_path", "videos",
        "--result_path", "res",
    ]
    log_file = "video_processing.log"
    with open(log_file, "a") as log:
        try:
            # print("should")
            log.write("Starting video processing...\n")
            subprocess.run(command, check=True)
            log.write("Video processing completed successfully.\n")
        except subprocess.CalledProcessError as e:
            log.write(f"Error during video processing: {e}\n")

@app.route('/upload', methods=['POST'])
def upload_video():
    # print("in")
    if 'video' not in request.files:
        return jsonify({'error': 'No video file part'}), 400
    
    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the video
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)


    run_video_processing()

    return jsonify({'message': 'Video uploaded successfully!', 'file_path': filepath}), 200

@app.route("/fetch_games", methods=["GET"])
def fetch_games():
    return jsonify(["test1","test2","test3","test4","test5","test6"])

# Usage: /fetch_player_position?video_id=video_name
@app.route('/fetch_player_position', methods=["GET"])
def fetch_player_position():
    # Get cached res data
    video_id = request.args.get('video_id')
    # print(video_id)
    if not video_id:
        return jsonify({"error": "video_id is required"}), 400
    
    player_data = fetch_player_result(video_id=video_id)
    # print(player_data)
    court_data = fetch_court_result(video_id=video_id)
    court_homography = CourtHomography(court_data["court_info"])

    # Function to calculate the 2D average of two points
    def calculate_average_of_two(points, index1, index2):
        if not points or len(points) <= max(index1, index2):  # Ensure indices are valid
            return None  # Return None if the indices are out of bounds
        point1 = points[index1]
        point2 = points[index2]
        return ((point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2)

    # Process the average foot pos in each frame
    averages = {}
    for frame_index, frame_data in player_data.items():
        # print(frame_index)
        top_points = frame_data.get("top", [])
        bottom_points = frame_data.get("bottom", [])
        
        # Calculate averages for top and bottom, using indices 15 and 16
        top_average = calculate_average_of_two(top_points, 15, 16)
        bottom_average = calculate_average_of_two(bottom_points, 15, 16)
        
        # Store the averages
        averages[frame_index] = {
            "top_average": top_average,
            "bottom_average": bottom_average
        }
    # print(averages)
    # Print the results
    homography_result = {}
    for frame_index, val in averages.items():
        top_homography = court_homography.pixel_to_real_world(val['top_average'])
        bottom_homography = court_homography.pixel_to_real_world(val['bottom_average'])

        homography_result[frame_index] = {
            "top": top_homography,
            "bottom": bottom_homography
        }
    # print(homography_result)
    return homography_result

# Usage: /fetch_birdie_end_pos?video_id=video_name
@app.route("/fetch_birdie_end_pos", methods=["GET"])
def fetch_biride_end_pos():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "video_id is required"}), 400

    results = fetch_ball_result(video_id)
    print("results: ")
    print(results)
    court_data = fetch_court_result(video_id=video_id)
    court_homography = CourtHomography(court_data["court_info"])

    homography_result = []
    for x, y in results:
        h_res = court_homography.pixel_to_real_world((x,y))
        homography_result.append(h_res)
    d = jsonify({"pos": homography_result})
    print(homography_result)
    return jsonify({"pos": homography_result})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
