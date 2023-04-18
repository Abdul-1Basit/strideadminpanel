import React from "react";
import Typography from "../../../Components/Typography";
import { endpoints } from "../../../Helpers/dbConfig";
import { notification } from "antd";
import { apiDeleteRequest } from "../../../Helpers/axiosRequests";
import CustomButton from "../../../Components/CustomButton";
import { cancelButton } from "../../CommonStyles";
import { deleteBlog, deleteWorkout } from "../../../Helpers/firebase";
import SpinnerComponent from "../../../Components/SpinnerComponent";
const DeleteModal = (props) => {
	const [loading, setLoading] = React.useState(false);
	const deleteCategory = async () => {
		// try{
		// console.log(props.activeCategory)
		setLoading(true);
		const resp = await deleteBlog(props.activeCategory);
		if (resp) {
			setLoading(false);
			props.successMessage(props.setShowDeleteModal, "delete");
			return;
		} else {
			notification.error({
				message: `Failed to delete!`,
				description: `Please try again later`,
				placement: "topRight",
				duration: 0,
				onClose: function () {
					props.setShowDeleteModal(false);
				},
			});
		}
		// }
		// catch(error){
		//   let errorMessage='Network Error'
		//   if (error.toString().includes("401")) {
		//    errorMessage='Authentication Error!';
		//  }
		//  else if(error.toString().includes("400")){
		//    errorMessage='Invalid values';
		//  }
		//  else if (error.toString().includes('500')||error.toString().includes("503")){
		//    errorMessage='Server error';
		//  }
		//  notification.error({
		//    message: `Failed to delete!`,
		//    description:
		//      `${errorMessage}`,
		//    placement:'topRight',
		//    duration:0,onClose: function(){props.setShowDeleteModal(false)}});
		// }
	};

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
					onClick={() => props.setShowDeleteModal(false)}
				/>
			</div>
		</div>
	);
};
export default DeleteModal;
