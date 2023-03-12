import { Upload, message } from "antd";
import { primaryColor } from "../../Constants";
import { InboxOutlined } from "@material-ui/icons";
const DragOrUpload = () => {
	const { Dragger } = Upload;
	const props = {
		name: "file",
		multiple: true,
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	return (
		<Dragger
			{...props}
			style={{
				width: "100%",
				height: 200,
				//	width: "100%",
				borderColor: primaryColor,
				border: "1px dashed #101a33",
				borderRadius: 8,
			}}
		>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p>
				Drop your files here or{" "}
				<span style={{ color: primaryColor }}>Browse</span>
			</p>
		</Dragger>
	);
};
export default DragOrUpload;
