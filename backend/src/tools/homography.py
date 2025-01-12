import numpy as np
import cv2

# Real-world coordinates in feet (standard singles court)
real_world_coords = [
    [0, 44],       # Top-left
    [17, 44],      # Top-right
    [0, 22],       # Mid-left
    [17, 22],      # Mid-right
    [0, 0],        # Bottom-left
    [17, 0]        # Bottom-right
]

class CourtHomography:
    def __init__(self, pixel_coords):
        """
        Initialize the CourtHomography object with pixel and real-world coordinates.

        :param pixel_coords: List of pixel coordinates (Nx2 array-like)
        :param real_world_coords: List of real-world coordinates in feet (Nx2 array-like)
        """
        self.pixel_coords = np.array(pixel_coords, dtype=np.float32)
        self.real_world_coords = np.array(real_world_coords, dtype=np.float32)
        
        # Compute the homography matrix
        self.homography_matrix, _ = cv2.findHomography(self.pixel_coords, self.real_world_coords)

    def pixel_to_real_world(self, pixel_point):
        """
        Convert a pixel coordinate to real-world coordinates in feet.

        :param pixel_point: Pixel coordinate [x, y]
        :return: Real-world coordinate (x, y) in feet, or None if out of bounds
        """
        if pixel_point is None:
            return None

        pixel_point = np.array([*pixel_point, 1], dtype=np.float32)  # Homogeneous coordinates
        real_world_point = np.dot(self.homography_matrix, pixel_point)
        real_world_point /= real_world_point[2]  # Normalize by z-coordinate
        
        return (real_world_point[0], real_world_point[1])

    def pixel_to_ratio(self, pixel_point):
        """
        Convert a pixel coordinate to a ratio relative to the court dimensions.

        :param pixel_point: Pixel coordinate [x, y]
        :return: Ratio [x_ratio, y_ratio] (0 to 1), or None if out of bounds
        """
        real_world_point = self.pixel_to_real_world(pixel_point)
        
        if real_world_point is None:
            return None

        # Court dimensions (hardcoded for standard singles court: 27x78 feet)
        court_width = 27
        court_length = 78

        x_ratio = real_world_point[0] / court_width
        y_ratio = real_world_point[1] / court_length

        # Ensure ratios are within bounds
        if 0 <= x_ratio <= 1 and 0 <= y_ratio <= 1:
            return [x_ratio, y_ratio]
        else:
            return None

# Example usage
if __name__ == "__main__":
    # Pixel coordinates of the court (from the image)
    pixel_coords = [
        [608, 515],    # Top-left
        [1305, 515],   # Top-right
        [539, 707],    # Mid-left
        [1376, 707],   # Mid-right
        [434, 1006],   # Bottom-left
        [1483, 1006]   # Bottom-right
    ]

    # Initialize the CourtHomography class
    court_homography = CourtHomography(pixel_coords)

    # Test pixel to real-world coordinate conversion
    sample_pixel = [608, 515]  # Example pixel point
    real_world = court_homography.pixel_to_real_world(sample_pixel)
    print(f"Pixel {sample_pixel} maps to Real-World {real_world} (in feet)")

    # Test pixel to ratio conversion
    ratio = court_homography.pixel_to_ratio(sample_pixel)
    print(f"Pixel {sample_pixel} maps to Ratio {ratio} (relative to court)")
