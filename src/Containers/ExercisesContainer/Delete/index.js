import React from "react";
import { deleteExercise } from "../../../Helpers/firebase";
import { notification } from "antd";
import SpinnerComponent from "../../../Components/SpinnerComponent";

const DeleteModal = (props) => {
	//console.log(props.activeCategory)

	const deleteCategory = async () => {
		// const resp=await apiDeleteRequest(endpoints.deleteProduct,{
		// "productId":parseInt(props.activeCategory.productId)
		// })
		// if(resp.status===200){
		if (await deleteExercise(props.activeCategory)) {
			props.successMessage(props.setShowDeleteModal, "delete");
			// }}
		} else {
			notification.error({
				message: `Failed to delete!`,
				description: `try again later`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setShowDeleteModal(false);
				},
			});
		}
	};
	const [loading, setLoading] = React.useState(false);
	// React.useEffect(() => {}, []);
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
