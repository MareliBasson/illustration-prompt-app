import React, { useState } from "react";
import storage from "firebaseConfig";
import "./image-uploader.css";

const ImageUpload = ({ imageUrl, setValue }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setValue(url, "image");
          });
      }
    );
  };

  const inProgress = progress > 0 && progress < 100;
  const hasImage = url || imageUrl;

  return (
    <div className="image-uploader">
      <h4>Image: </h4>
      <div className="file-input">
        <div className="file-input-wrapper">
          <label htmlFor="upload" className="btn btn-primary">
            Choose File
          </label>
          <div className="file-input-buffer">&nbsp;</div>
          <input id="upload" type="file" onChange={handleChange} />
        </div>
        <button
          onClick={handleUpload}
          className="btn btn-confirm"
          disabled={!image}
        >
          Upload
        </button>
      </div>
      {(hasImage || inProgress) && (
        <div className="preview">
          {inProgress && (
            <div className="progress-wrapper">
              <progress value={progress} max="100" className="progress" />
            </div>
          )}
          {hasImage && !inProgress && (
            <>
              <div className="image-wrapper">
                <img src={url ? url : imageUrl} alt="Uploaded Images" />
              </div>

              <button
                className="btn btn-icon"
                onClick={() => {
                  setValue("", "image");
                  setUrl("");
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
