import React, { useCallback } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { primaryColor } from "../../../Constants";
import { uploadImage } from "../../../Helpers/firebase";
import SpinnerComponent from "../../../Components/SpinnerComponent";
function ProductDropZone({ setImageUrl, small = false }) {
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
			style={{
				width: small ? 50 : "100%",
				height: small ? 50 : 200,
				borderColor: primaryColor,
				border: "1px dashed #101a33",
				borderRadius: 8,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			{isDragActive ? (
				!small && <p>Drop the files here ...</p>
			) : (
				<>
					<input {...getInputProps()} />
					<p className="ant-upload-drag-icon">
						<InboxOutlined
							size={small ? 15 : 50}
							style={{ fontSize: small ? 15 : 60, color: primaryColor }}
						/>
					</p>
					{!small && (
						<p //style={{ fontSize: small ? 8 : 14 }}
						>
							Drop your files here or
							<span style={{ color: primaryColor }}>Browse</span>
						</p>
					)}
				</>
			)}
		</div>
	);
}
export default ProductDropZone;
