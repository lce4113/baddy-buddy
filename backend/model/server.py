from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import pandas as pd

from src.tools.homography import CourtHomography
from src.tools.result_fetcher import fetch_ball_result, fetch_court_result, fetch_player_result

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

UPLOAD_FOLDER = 'videos'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file part'}), 400
    
    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the video
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    return jsonify({'message': 'Video uploaded successfully!', 'file_path': filepath}), 200


# Usage: /fetch_player_position?video_id=video_name

@app.route('/fetch_player_position', methods=["GET"])
def fetch_player_position():
    # Get cached res data
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "video_id is required"}), 400
    
    player_data = fetch_player_result(video_id=video_id)
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

    # Print the results
    homography_result = {}
    for frame_index, val in averages.items():
        top_homography = court_homography.pixel_to_real_world(val['top_average'])
        bottom_homography = court_homography.pixel_to_real_world(val['bottom_average'])

        homography_result[frame_index] = {
            "top": top_homography,
            "bottom": bottom_homography
        }

    return homography_result

if __name__ == '__main__':
    app.run(debug=True)
