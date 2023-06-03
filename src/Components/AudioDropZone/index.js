import React from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../Helpers/firebase";
import SpinnerComponent from "../SpinnerComponent";
import { IoMdAdd } from "react-icons/io";
import "./index.css";
function AudioDropZone({ setImageUrl, small = false, increaseLength = false }) {
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
		<div
			{...getRootProps()}
			className="audioDropzonee"
			style={{ width: "100%", height: 130 }}
		>
			{isDragActive ? (
				!small && <p>Drop the files here ...</p>
			) : (
				<div
					className="colCenteral drpzn"
					style={{ width: "100%", height: 108 }}
				>
					<input {...getInputProps()} />
					<div className="rowing">
						<div className="plusAddSign" style={{ marginRight: 10 }}>
							<IoMdAdd color="#fff" size={25} />
						</div>
						<span className="newTextForPicker">Upload Audio Coaching </span>
					</div>
				</div>
			)}
		</div>
	);
}
export default AudioDropZone;
