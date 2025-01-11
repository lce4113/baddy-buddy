import cv2
import numpy as np
import os
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe.framework.formats import landmark_pb2

# Load the model
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "pose_landmarker_lite.task")
base_options = python.BaseOptions(model_asset_path=model_path)
pose_options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.IMAGE,
    num_poses=1,
    min_pose_detection_confidence=0.5,
    min_pose_presence_confidence=0.5,
    min_tracking_confidence=0.5,
)

landmarker = vision.PoseLandmarker.create_from_options(pose_options)


def detect_player(frame):
    """
    Detects players' poses in the given frame using MediaPipe.
    Args:
        frame: A single frame of the video (BGR format).
    Returns:
        Processed frame with pose landmarks drawn and pose landmarks (if detected).
    """
    # Convert the frame to a MediaPipe Image
    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB),
    )

    # Perform pose detection
    detection_result = landmarker.detect(mp_image)

    # Draw landmarks on the frame
    pose_landmarks_list = detection_result.pose_landmarks
    annotated_image = np.copy(frame)
    image_height, image_width, _ = annotated_image.shape

    player_landmarks = []

    for idx, pose_landmarks in enumerate(pose_landmarks_list):
        # Convert landmarks to protobuf format for drawing
        pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        pose_landmarks_proto.landmark.extend(
            [
                landmark_pb2.NormalizedLandmark(
                    x=landmark.x, y=landmark.y, z=landmark.z
                )
                for landmark in pose_landmarks
            ]
        )

        # Draw landmarks
        mp.solutions.drawing_utils.draw_landmarks(
            annotated_image,
            pose_landmarks_proto,
            mp.solutions.pose.POSE_CONNECTIONS,
            mp.solutions.drawing_styles.get_default_pose_landmarks_style(),
        )

        # Extract and scale landmarks
        scaled_landmarks = [
            (int(landmark.x * image_width), int(landmark.y * image_height))
            for landmark in pose_landmarks
        ]
        player_landmarks.append(scaled_landmarks)

    return annotated_image, player_landmarks
