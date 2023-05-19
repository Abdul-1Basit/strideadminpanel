import React from "react";
import { deleteWorkoutCategory } from "../../../Helpers/firebase";
import { notification } from "antd";
import SpinnerComponent from "../../../Components/SpinnerComponent";

const DeleteModal = (props) => {
	const deleteCategory = async () => {
		setLoading(true);
		if (await deleteWorkoutCategory(props.activeCategory)) {
			notification.success({
				message: `Successfully deleted category!`,
				description: `${props.activeCategory.name}  has been successfully deleted from Category list`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setLoading(false);
					props.setDeleteModal(false);
				},
			});
		} else {
			notification.error({
				message: `Failed to delete!`,
				description: `try again later`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setLoading(false);
					props.setDeleteModal(false);
				},
			});
		}
	};
	const [loading, setLoading] = React.useState(false);
	return (
		<div className="flexCol">
			<span className="deleteModalHeading">Warning!</span>
			<span className="deleteDescription">
				Are you sure you want to delete ({props.activeCategory.name}) ?
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
						onClick={() => deleteCategory()}
					/>
				)}
				<input
					type={"button"}
					value={"No"}
					className="cancelBtn"
					onClick={() => props.setDeleteModal(false)}
				/>
			</div>
		</div>
	);
};
export default DeleteModal;
