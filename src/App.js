import React from "react";
import Webcam from "react-webcam";
//TODO: Import tensorflow and coco-ssd
//TODO: Import drawing utility

function App() {
  const webcamRef = React.useRef(null);

  React.useEffect(() => {
    //TODO: Load the model
    //TODO: Detect objects from the camera stream
    //TODO: Display predictions in overlay
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
      />
    </div>
  );
}

export default App;
