import React, { useState } from "react";
import storage from "firebaseConfig";

import styled from "styled-components";
import { tokens } from "styles/variables";

export const ImageUpload = ({ imageUrl, setValue }) => {
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

  // TODO: investigate multiple imageUrl and url checks when image is selected
  // console.log(url)
  // console.log(imageUrl)

  return (
    <ImageUploader>
      <h4>Image: </h4>
      <FileInput>
        <FileInputWrapper>
          <label htmlFor="upload" className="btn btn-primary">
            Choose File
          </label>
          <div className="file-input-buffer">&nbsp;</div>
          <input id="upload" type="file" onChange={handleChange} />
        </FileInputWrapper>
        <button
          onClick={handleUpload}
          className="btn btn-confirm"
          disabled={!image}
        >
          Upload
        </button>
      </FileInput>
      {(hasImage || inProgress) && (
        <Preview>
          {inProgress && (
            <ProgressWrapper>
              <progress value={progress} max="100" className="progress" />
            </ProgressWrapper>
          )}
          {hasImage && !inProgress && (
            <>
              <ImageWrapper>
                <img src={url ? url : imageUrl} alt="Uploaded Images" />
              </ImageWrapper>

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
        </Preview>
      )}
    </ImageUploader>
  );
};

const ImageUploader = styled.div`
	h4 {
		margin-bottom: 10px;
	}
`
const FileInput = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
`
const FileInputWrapper = styled.div`
			flex: 1;

			> * {
				vertical-align: middle;
			}
`
const Preview = styled.div`
		position: relative;
		text-align: center;
		margin-top: 15px;
		background-color: rgba(0, 0, 0, 0.3);
		padding: 15px 0px;

		button {
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			height: 40px;
			width: 40px;
			cursor: pointer;

			&:hover {
				&:after {
					content: 'Remove Image';
					position: absolute;
					top: 120%;
					left: 50%;
					transform: translateX(-50%);
					text-align: center;
				}
			}
		}
`
const ProgressWrapper = styled.div`
			height: ${tokens.previewHeight};
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
`
const ImageWrapper = styled.div`
			height: ${tokens.previewHeight};

			img {
				height: 100%;
			}
`

