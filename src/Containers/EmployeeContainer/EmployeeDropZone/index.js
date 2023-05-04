import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { primaryColor } from "../../../Constants";
import { uploadImage } from "../../../Helpers/firebase";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { IoMdAdd } from "react-icons/io";
import "./index.css";
function EmployeeDropZone({
	setImageUrl,
	small = false,
	shortWidth = false,
	setTypeOfMedia = null,
}) {
	const [isLoading, setIsLoading] = React.useState(false);
	const onDrop = async (acceptedFiles) => {
		console.log("icnludes", acceptedFiles[0].type.includes("video"));
		if (acceptedFiles[0].type.includes("video")) {
			console.log("setting to true");
			setTypeOfMedia(true);
		}
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
			className="dropZoneDiv"
			style={{ width: shortWidth ? 240 : 298 }}
		>
			{isDragActive ? (
				!small && <p>Drop the files here ...</p>
			) : (
				<div
					className="colCenteral drpzn"
					style={{ width: shortWidth ? 240 : 298, height: 258 }}
				>
					<input {...getInputProps()} />
					<p //style={{ fontSize: small ? 8 : 14 }}
						className="newTextForPicker"
					>
						Upload a Video or Image{" "}
					</p>
					<span className="imageMesaurement">(Should be 1280 x 800)</span>
					<div className="plusAddSign">
						<IoMdAdd color="#fff" size={25} />
					</div>
					<br />
					<span className="newTextForPicker">Browse</span>{" "}
					<span className="newTextForPicker">-or-</span>
					<span className="newTextForPicker">Drag and Drop</span>
				</div>
			)}
		</div>
	);
}
export default EmployeeDropZone;
