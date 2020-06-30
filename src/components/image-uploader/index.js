import React, { Component } from "react"
import storage from "firebaseConfig"
import "./image-uploader.css"

class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null,
			url: "",
			progress: 0,
		}
	}

	handleChange = (e) => {
		if (e.target.files[0]) {
			const image = e.target.files[0]
			this.setState(() => ({ image }))
		}
	}

	handleUpload = () => {
		const { image } = this.state
		const uploadTask = storage.ref(`images/${image.name}`).put(image)
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// progress function ...
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				this.setState({ progress })
			},
			(error) => {
				// Error function ...
				console.log(error)
			},
			() => {
				// complete function ...
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						// this.setState({ url })
						this.props.setValue(url, "image")
					})
			}
		)
	}

	render() {
		const { url, progress } = this.state
		const { imageUrl } = this.props

		const inProgress = progress > 0 && progress < 100

		console.log(url)

		return (
			<div className="image-uploader">
				<h4>Image: </h4>
				<div className="file-input">
					<div className="file-input-wrapper">
						<label htmlFor="upload" className="btn btn-primary">
							Choose File
						</label>
						<div className="file-input-buffer">&nbsp;</div>
						<input id="upload" type="file" onChange={this.handleChange} />
					</div>
					<button onClick={this.handleUpload} className="btn btn-confirm">
						Upload
					</button>
				</div>
				<div className="preview">
					{inProgress && (
						<div className="progress-wrapper">
							<progress value={progress} max="100" className="progress" />
						</div>
					)}
					{(url || imageUrl) && !inProgress && (
						<>
							<div className="image-wrapper">
								<img src={url ? url : imageUrl} alt="Uploaded Images" />
							</div>

							<button className="btn btn-primary" onClick={() => this.props.setValue("", "image")}>
								Remove Image
							</button>
						</>
					)}
				</div>
			</div>
		)
	}
}

export default ImageUpload
