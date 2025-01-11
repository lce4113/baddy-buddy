import cv2
import mediapipe as mp

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils


def detect_player(frame):
    """
    Processes the given frame with MediaPipe Pose to detect a player and draw landmarks.
    Args:
        frame: A single frame of the video (BGR format).
    Returns:
        Processed frame with pose landmarks drawn.
    """
    with mp_pose.Pose() as pose:
        # Convert the frame to RGB (MediaPipe expects RGB input)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the frame to detect poses
        results = pose.process(rgb_frame)

        # Draw pose landmarks on the original frame
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=2)
            )

    return frame
