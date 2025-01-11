import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load the CSV file
file_name = "test_videos/input3_output_wasb.csv"
data = pd.read_csv(file_name)

# Constants and thresholds
FPS = 60
GROUND_LEVEL = 700  # Adjust based on your frame
COURT_X_MIN, COURT_X_MAX = 100, 1200  # X boundaries of the court
COURT_Y_MIN, COURT_Y_MAX = 50, 700  # Y boundaries of the court
STATIONARY_THRESHOLD = 5  # Pixels
STATIONARY_WINDOW = 5  # Number of frames to consider stationary

# Calculate time in seconds
data['time_seconds'] = data['frame_number'] / FPS

# Detect ground contact
data['ground_contact'] = data['y'] >= GROUND_LEVEL

# Detect out of bounds
data['out_of_bounds'] = (
    (data['x'] < COURT_X_MIN) | (data['x'] > COURT_X_MAX) |
    (data['y'] < COURT_Y_MIN) | (data['y'] > COURT_Y_MAX)
)

# Calculate Euclidean distance between consecutive frames
data['distance'] = np.sqrt((data['x'] - data['x'].shift(1))**2 + (data['y'] - data['y'].shift(1))**2)
data['stationary'] = data['distance'] < STATIONARY_THRESHOLD

# Detect end conditions
def detect_rally_end(data):
    for i in range(len(data)):
        # Check ground contact
        if data['ground_contact'].iloc[i]:
            return i, "Ground Contact"
        # Check out of bounds
        if data['out_of_bounds'].iloc[i]:
            return i, "Out of Bounds"
        # Check stationary shuttlecock
        if data['stationary'].iloc[max(0, i-STATIONARY_WINDOW):i].sum() >= STATIONARY_WINDOW:
            return i, "Stationary"
    return None, "Ongoing"

# Detect rally end
end_frame, end_reason = detect_rally_end(data)

# Plot x and y positions over time
plt.figure(figsize=(10, 6))
plt.plot(data['time_seconds'], data['x'], label='x-coordinate', marker='o', alpha=0.7)
plt.plot(data['time_seconds'], data['y'], label='y-coordinate', marker='o', alpha=0.7)

# Highlight frames where detection is 0 (in red)
no_detection = data[data['confidence'] <= 100]
plt.scatter(no_detection['time_seconds'], no_detection['x'], color='red', label='No Detection (X)', zorder=5)
plt.scatter(no_detection['time_seconds'], no_detection['y'], color='red', label='No Detection (Y)', zorder=5)

# Highlight the end of the rally
if end_frame is not None:
    end_time = data['time_seconds'].iloc[end_frame]
    plt.axvline(x=end_time, color='red', linestyle='--', label=f'Rally End: {end_reason} (Time: {end_time:.2f}s)')
    plt.scatter(data['time_seconds'].iloc[end_frame], data['x'].iloc[end_frame], color='blue', label='End Point (X)', zorder=6)
    plt.scatter(data['time_seconds'].iloc[end_frame], data['y'].iloc[end_frame], color='orange', label='End Point (Y)', zorder=6)

# Customize the plot
plt.title("Shuttlecock Movement During Rally")
plt.xlabel("Time (seconds)")
plt.ylabel("Pixel Coordinates")
plt.legend()
plt.grid()
plt.tight_layout()

# Show the plot
plt.show()

# Print the result
if end_frame is not None:
    print(f"Rally ended at frame {end_frame}, time {data['time_seconds'].iloc[end_frame]:.2f}s, due to {end_reason}.")
else:
    print("The rally is still ongoing.")
