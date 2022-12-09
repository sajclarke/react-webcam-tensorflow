import React from "react";
import Webcam from "react-webcam";
//TODO: Import tensorflow and coco-ssd
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
//TODO: Import drawing utility
import { drawRect } from "./utilities";
function App() {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const loadModel = async () => {
    // Load tensorflow
    await tf.ready();
    // Load the model
    const net = await cocossd.load();
    //  Loop and run predictions
    setInterval(() => {
      handleCameraPredictions(net);
    }, 100);
  };

  const handleCameraPredictions = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Detect objects from the camera stream
      const obj = await net.detect(video);

      //Display predictions in overlay
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  React.useEffect(() => {
    //Load the model
    return () => loadModel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>GDG Example</p>
      <Webcam
        ref={webcamRef}
        audio={false}
        imageSmoothing={true}
        videoConstraints={{
          facingMode: "user",
        }}
        className="absolute left-0 right-0 text-center z-10"
      />
      <canvas
        ref={canvasRef}
        className="absolute left-0 right-0 text-center z-20"
      />
    </div>
  );
}

export default App;
