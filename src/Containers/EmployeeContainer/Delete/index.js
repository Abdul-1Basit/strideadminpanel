import React from "react";
import { notification } from "antd";
import Typography from "../../../Components/Typography";
import CustomButton from "../../../Components/CustomButton";
import { cancelButton } from "../../CommonStyles";
import Wrapper from "../../../Components/Wrapper";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { deleteEmployee } from "../../../Helpers/firebase";
const DeleteModal = (props) => {
	const [loading, setLoading] = React.useState(false);
	const deleteActiveUser = async () => {
		setLoading(true);
		if (await deleteEmployee(props.activeCategory)) {
			props.successMessage(props.setDeleteModal, "delete");
		} else {
			notification.error({
				message: `Failed to delete!`,
				description: `Please try again`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setLoading(false);

					props.setDeleteModal(false);
				},
			});
		}
	};

	return (
		<div className="flexCol">
			<span className="deleteModalHeading">Warning!</span>
			<span className="deleteDescription">
				Are you sure you want to delete ({props.activeCategory.id}) ?
			</span>
			<br />
			<div className="rowCenter">
				{loading ? (
					<SpinnerComponent size="large" />
				) : (
					<input
						type={"button"}
						value={"Yes"}
						className="deleteBtn"
						style={{ backgroundColor: "#f94f00" }}
						onClick={() => deleteActiveUser()}
					/>
				)}
				<input
					type={"button"}
					value={"No"}
					className="cancelBtn"
					onClick={() => props.setDeleteModal(false)}
				/>
				{/* <input
					type={"button"}
					style={cancelButton}
					disabled={loading}
					value="Cancel"
					onClick={() => {
						props.setDeleteModal(false);
					}}
				/> */}
			</div>
		</div>
	);
};
export default DeleteModal;
