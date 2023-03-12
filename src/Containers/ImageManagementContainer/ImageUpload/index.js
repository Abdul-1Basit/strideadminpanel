import React from "react";
import { Modal } from "antd";
import { primaryColor } from "../../../Constants";
import CustomDropZone from "../../../Components/CustomDropZone";
import { AiFillDelete } from "react-icons/ai";
import {
	addImageToBanner,
	addImageToCarousel,
} from "../../../Helpers/firebase";
import SpinnerComponent from "../../../Components/SpinnerComponent";
const ImageUpload = ({ isModalOpen, setIsModalOpen, carousel }) => {
	const [fileList, setFileList] = React.useState([]);
	const [imageError, setImageError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const uploadImageToList = async () => {
		if (fileList.length < 1) {
			setImageError(true);
			return;
		}
		setIsLoading(true);
		if (carousel) {
			await addImageToCarousel(fileList[0]);
		} else {
			await addImageToBanner(fileList[0]);
		}
		setIsLoading(false);
		setIsModalOpen(false);
	};
	return (
		<Modal
			title="Image Uploading"
			open={isModalOpen}
			className="ModalStyle"
			closable
			onCancel={() => setIsModalOpen(false)}
			destroyOnClose
			footer={null}
			visible={isModalOpen}
		>
			{fileList.length === 0 && (
				<CustomDropZone {...{ fileList, setFileList, setImageError }} />
			)}
			{fileList &&
				fileList.map((item, index) => {
					//console.log("item", item);
					return (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							key={index}
						>
							{" "}
							<span
								style={{
									border: "2px solid " + primaryColor,
									width: 200,
									padding: 10,
									borderRadius: 8,
									margin: 10,
								}}
							>
								{item.name}
								<AiFillDelete
									onClick={() => {
										setFileList([]);
									}}
									style={{ marginLeft: 10, color: "red" }}
								/>
							</span>{" "}
						</div>
					);
				})}
			{imageError && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-evenly",
						flexDirection: "row",
						marginTop: 10,
					}}
				>
					<span style={{ color: "red", textAlign: "center", fontSize: 16 }}>
						Please add an Image
					</span>
				</div>
			)}
			{isLoading ? (
				<SpinnerComponent size="large" />
			) : (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-evenly",
						flexDirection: "row",
						marginTop: 10,
					}}
				>
					<button
						style={{
							backgroundColor: primaryColor,
							color: "#fff",
							size: 16,
							textAlign: "center",
							border: 0,
							width: "100%",
							height: 46,
							borderRadius: 8,
							fontFamily: "Gilroy-Bold",
							maxWidth: 300,
						}}
						//disabled={imageError}
						onClick={() => {
							uploadImageToList();
						}}
					>
						Upload Image
					</button>
					<button
						style={{
							color: primaryColor,
							border: "2px solid " + primaryColor,
							backgroundColor: "#fff",
							size: 16,
							textAlign: "center",
							// border: 0,
							width: "100%",
							height: 46,
							borderRadius: 8,
							fontFamily: "Gilroy-Bold",
							maxWidth: 300,
						}}
						onClick={() => {
							setIsModalOpen(false);
						}}
					>
						Cancel
					</button>
				</div>
			)}
		</Modal>
	);
};
export default ImageUpload;
