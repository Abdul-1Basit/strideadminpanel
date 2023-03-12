import { primaryColor } from "../../Constants";

const ModalStyle = { top: 0, right: 0, float: "right", position: "fixed" };
const ModalBodyStyle = {
	width: "100%",
	height: "100vh",
	overflowY: "scroll",
	msOverflowStyle: "none",
	scrollbarWidth: "none",
};
const DeleteModalStyle = { top: 0, right: 0, left: 0, width: "100%" };
const DeleteBodyStyle = { width: "100%", borderRadius: 8, marginTop: 20 };
const inputStyle = {
	background: "#FFFFFF",
	paddingTop: 13,
	paddingBottom: 13,
	paddingLeft: 14,
	paddingRight: 14,
	outline: "none",
	width: "100%",
	height: 46,
	border: "1px solid #E2E8F0",
	borderRadius: 8,
	color: "#64748B",
};
const selectStyle = {
	background: "#FFFFFF",
	width: "100%",
	border: 0,
	borderRadius: 8,
	color: "#64748B",
	outline: "none",
};
const fieldDiv = {
	display: "flex",
	flexDirection: "column",
	marginBottom: 24,
	marginTop: 24,
};
const cancelButton = {
	backgroundColor: "#E5E5E5",
	color: "#E1552F",
	size: 16,
	textAlign: "center",
	border: 0,
	width: "100%",
	maxWidth: 100,
	height: 46,
	marginLeft: 20,
	borderRadius: 8,
	fontFamily: "Gilroy-Bold",
};
const searchAddButton = {
	backgroundColor: primaryColor,
	color: "#fff",
	size: 16,
	textAlign: "center",
	border: 0,
	width: "100%",
	maxWidth: 147,
	height: 40,
	borderRadius: 4,
	fontFamily: "Gilroy-Medium",
};
const searchAddButtonDiv = {
	backgroundColor: " transparent",
	borderRadius: 4,
	display: "flex",
	width: "100%",
	maxWidth: 192,
	marginRight: 16,
	height: 40,
	alignItems: "center",
	justifyContent: "space-between",
	paddingLeft: 12,
	paddingRight: 12,
	paddingTop: 10,
	paddingBottom: 10,
};
const searchComponentDiv = {
	marginTop: 32,
	marginBottom: 24,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
};
const modalButtonStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	marginTop: 56,
	marginBottom: 50,
};
export {
	ModalBodyStyle,
	ModalStyle,
	modalButtonStyle,
	DeleteModalStyle,
	DeleteBodyStyle,
	inputStyle,
	selectStyle,
	fieldDiv,
	cancelButton,
	searchAddButton,
	searchAddButtonDiv,
	searchComponentDiv,
};
