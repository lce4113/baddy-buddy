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

    print("Warning: Not ready yet!!!")


    # TODO: Make this load with {video_id}* since there are many files, where the end of the name indicates the range of frames

    file_path = f"res/ball/lloca_info(denoise)/{video_id}.json"

    if not os.path.exists(file_path):
        raise KeyError("File does not exist")
    
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        raise RuntimeError("Could not read JSON")
    
    return data