# Baddy Buddy

Advanced analytics for badminton games, using computer vision and gen AI. 1st place entertainment track at SBHacks 11.

[YouTube Demo Link](https://www.youtube.com/watch?v=J8pcAyOfyFE)

[Devpost Submission](https://devpost.com/software/baddy-buddy)

| ![Image 1](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/208/548/datas/gallery.jpg) | ![Image 2](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/208/550/datas/gallery.jpg) | ![Image 3](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/208/549/datas/gallery.jpg) |
|-------------------------|-------------------------|-------------------------|



## Inspiration

There are over 300 million badminton players looking to improve their game. There’s no way coaches can give personalized insights to so many people!

Our teammate Ishan is a **top 20** ranked player in the nation and as a private coach to many, he knows how tedious it is to scrub through game footage to collect stats. The goal of **Baddy Buddy** is to automate this process so coaches and players like Ishan can focus on their game, not go insane!

## How we built it

We use a Flask backend to handle video upload and HTTP requests. Once the client uploads their game footage, we use pretrained models based on [Keypoint RCNN](https://pytorch.org/vision/main/models/keypoint_rcnn.html) for detecting both the players position and the court boundaries. Furthermore, we use a pretrained [TrackNetV3 model](https://github.com/alenzenx/TracknetV3) (published by Kaohswing University) to get pixel coordinates of the birdie on each video frame.

In order to make useful insights on the game, we must map pixel coordinates of the birdie and player to real world coordinates. This is done using projective transformation based on the court boundaries that we previously detected. All of this data is then sent to the client as a json file.

We use Next.js and TailwindCSS to build the frontend, along with heatmap.js for the graphs. We then integrated Anthropic’s Claude 3.5 Sonnet to be our “Birdie Baddie” coach, accessing all of the player’s game data and answering any related questions.
