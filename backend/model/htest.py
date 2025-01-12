import numpy as np
import cv2

# Pixel coordinates of the court (from court_info)
pixel_coords = np.array([
    [608, 515],    # Top-left
    [1305, 515],   # Top-right
    [539, 707],    # Mid-left
    [1376, 707],   # Mid-right
    [434, 1006],   # Bottom-left
    [1483, 1006]   # Bottom-right
], dtype=np.float32)

# Real-world coordinates in feet (corresponding to the pixel coordinates)
real_world_coords = np.array([
    [0, 78],       # Top-left
    [27, 78],      # Top-right
    [0, 39],       # Mid-left
    [27, 39],      # Mid-right
    [0, 0],        # Bottom-left
    [27, 0]        # Bottom-right
], dtype=np.float32)

# Compute the homography matrix
homography_matrix, _ = cv2.findHomography(pixel_coords, real_world_coords)

# Function to transform a pixel coordinate to real-world coordinates
def pixel_to_real_world(pixel_point, homography_matrix):
    pixel_point = np.array([*pixel_point, 1], dtype=np.float32)  # Convert to homogeneous coordinates
    real_world_point = np.dot(homography_matrix, pixel_point)
    real_world_point /= real_world_point[2]  # Normalize by z-coordinate
    return real_world_point[:2]

# Example: Transform a sample pixel coordinate
sample_pixel = [1079.619384765625, 426.7560119628906]  # Top-left corner in pixels
real_world = pixel_to_real_world(sample_pixel, homography_matrix)

print("Homography Matrix:")
print(homography_matrix)
print(f"Pixel {sample_pixel} maps to Real-World {real_world} (in feet)")
