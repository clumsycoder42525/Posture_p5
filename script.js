let capture;
let posenet;
let singlepose;
let skeleton;

function setup() {
    // Responsive canvas
    let canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    canvas.parent('sketch-container');

    // Webcam
    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();

    // PoseNet
    posenet = ml5.poseNet(capture);
    posenet.on('pose', gotPoses);
}

function windowResized() {
    resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
    capture.size(width, height);
}

function gotPoses(poses) {
    if (poses.length > 0) {
        singlepose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}


function draw() {
    background(0);

    // Video
    image(capture, 0, 0, width, height);

    if (singlepose) {
        // Keypoints
        fill(0, 255, 0);
        stroke(0, 255, 0);
        for (let i = 0; i < singlepose.keypoints.length; i++) {
            ellipse(singlepose.keypoints[i].position.x,
                    singlepose.keypoints[i].position.y, 12);
        }

        // Skeleton
        stroke(0, 255, 255); 
        strokeWeight(3);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y,
                 skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
    }
}
