import React from "react";
import { useDropzone } from "react-dropzone";
// import { uploadImage } from "../../../Helpers/firebase";
import { uploadImage } from "../../Helpers/firebase";
import SpinnerComponent from "../SpinnerComponent";
import "./index.css";
function CustomDropZone({ setImageUrl, small = false }) {
	const [isLoading, setIsLoading] = React.useState(false);
	const onDrop = async (acceptedFiles) => {
		setIsLoading(true);
		let returnUrl = await uploadImage(acceptedFiles[0]);
		setIsLoading(false);

		setImageUrl(returnUrl);
	};
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return isLoading ? (
		<SpinnerComponent size="small" />
	) : (
		<div {...getRootProps()} className="dropZoneDiv">
			{isDragActive ? (
				!small && <p>Drop the files here ...</p>
			) : (
				<div className="colCenteral drpzn" style={{ width: 150 }}>
					<input {...getInputProps()} />
					<p //style={{ fontSize: small ? 8 : 14 }}
						className="dropText"
					>
						Drag & Drop Image Here
					</p>
					<span className="orText">Or</span>
					<button className="btnPickerTxt btnPicker">Browse</button>
				</div>
			)}
		</div>
	);
}
export default CustomDropZone;
