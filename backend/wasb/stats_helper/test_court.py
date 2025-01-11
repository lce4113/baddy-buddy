# import the necessary packages
import numpy as np
import cv2

# load the image
image = cv2.imread("downscaled.png")

# define the list of boundaries
boundaries = [([180, 180, 100], [255, 255, 255])]

# loop over the boundaries
for (lower, upper) in boundaries:
    # create NumPy arrays from the boundaries
    lower = np.array(lower, dtype="uint8")
    upper = np.array(upper, dtype="uint8")

    # find the colors within the specified boundaries and apply
    # the mask
    mask = cv2.inRange(image, lower, upper)
    output = cv2.bitwise_and(image, image, mask=mask)

# Convert the output to grayscale
gray = cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)

# Apply the Harris corner detection
corners = cv2.cornerHarris(gray, 9, 3, 0.01)

# Normalize the corner response
corners = cv2.normalize(corners, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# Apply Otsu's thresholding
_, thresh = cv2.threshold(corners, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Dilate the thresholded image
kernel = np.ones((3, 3), np.uint8)
dilated = cv2.dilate(thresh, kernel, iterations=1)

# Find external contours
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw circles around the detected contours
for contour in contours:
    # Calculate the center of the contour
    M = cv2.moments(contour)
    if M["m00"] != 0:
        center_x = int(M["m10"] / M["m00"])
        center_y = int(M["m01"] / M["m00"])
        cv2.circle(image, (center_x, center_y), 3, (0, 0, 255), -1)

# Show the result
cv2.imshow("Image", image)
cv2.waitKey(0)
