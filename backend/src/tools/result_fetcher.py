import json
import os

def fetch_player_result(video_id):
    file_path = f"res/players/player_kp/{video_id}.json"

    if not os.path.exists(file_path):
        raise KeyError("File does not exist")
    
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        raise RuntimeError("Could not read JSON")
    
    return data

def fetch_court_result(video_id):
    file_path = f"res/courts/court_kp/{video_id}.json"

    if not os.path.exists(file_path):
        raise KeyError("File does not exist")
    
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        raise RuntimeError("Could not read JSON")
    
    return data

def fetch_ball_result(video_id):
    folder_path = f"res/ball/loca_info/{video_id}"
    results = []

    # Get all files in the folder
    for file_name in os.listdir(folder_path):
        if file_name.endswith('.json'):  # Check for JSON files
            file_path = os.path.join(folder_path, file_name)

            # Open and load the JSON file
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)

                # Get the last element in the JSON object
                if data:
                    last_key = sorted(data.keys(), key=int)[-1]  # Get the last key numerically
                    last_element = data[last_key]

                    # Extract x and y if visible
                    if last_element.get("visible") == 1:
                        x = last_element.get("x")
                        y = last_element.get("y")
                        results.append((x, y))

    return results
