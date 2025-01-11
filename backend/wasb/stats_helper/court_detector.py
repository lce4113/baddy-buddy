import cv2
import numpy as np

def detect_court(frame):
    """
    Detects the badminton court in the given frame.
    Args:
        frame: A single frame of the video (BGR format).
    Returns:
        Annotated frame with the detected court boundary and the coordinates of the court corners.
    """
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Apply GaussianBlur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Perform edge detection using Canny
    edges = cv2.Canny(blurred, 50, 150)

    # Use Hough Line Transform to detect court lines
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=100, maxLineGap=10)

    # Create a blank mask for line visualization
    line_mask = np.zeros_like(edges)

    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            cv2.line(line_mask, (x1, y1), (x2, y2), 255, 2)

    # Use contours to detect rectangles
    contours, _ = cv2.findContours(line_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    court_contour = None
    max_area = 0
    for contour in contours:
        # Approximate the contour to a polygon
        epsilon = 0.02 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)

        # Check if the polygon has 4 sides and is the largest found
        if len(approx) == 4 and cv2.isContourConvex(approx):
            area = cv2.contourArea(approx)
            if area > max_area:
                max_area = area
                court_contour = approx

    annotated_frame = np.copy(frame)
    court_corners = None

    if court_contour is not None:
        # Draw the detected court boundary
        cv2.drawContours(annotated_frame, [court_contour], -1, (0, 255, 0), 3)

        # Extract the court corners
        court_corners = np.squeeze(court_contour)
        if court_corners.shape[0] == 4:
            # Annotate the corners
            for i, (x, y) in enumerate(court_corners):
                cv2.circle(annotated_frame, (x, y), 8, (255, 0, 0), -1)
                cv2.putText(
                    annotated_frame,
                    f"Corner {i+1}",
                    (x + 10, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (255, 255, 255),
                    2,
                )

    return annotated_frame, court_corners


if __name__ == "__main__":
    # Example usage with a video or image
    video_path = "../test_videos/input.mov"  # Replace with your video file
    cap = cv2.VideoCapture(video_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Detect the court in the frame
        annotated_frame, court_corners = detect_court(frame)

        # Display the annotated frame
        cv2.imshow("Badminton Court Detection", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
