import React from "react";
import Typography from "../../../Components/Typography";
import { endpoints } from "../../../Helpers/dbConfig";
import { notification } from "antd";
import { apiDeleteRequest } from "../../../Helpers/axiosRequests";
import CustomButton from "../../../Components/CustomButton";
import { cancelButton } from "../../CommonStyles";
import { deleteWorkout } from "../../../Helpers/firebase";
const DeleteModal = (props) => {
	const deleteCategory = async () => {
		// try{
		// console.log(props.activeCategory)
		const resp = await deleteWorkout(props.activeCategory);
		if (resp) {
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
		<div
			style={{
				maxHeight: 150,
				borderRadius: 8,
				height: "100%",
				paddingLeft: 10,
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div>
				<Typography
					alignment="center"
					title={
						"Are you sure you want to delete " +
						props.activeCategory.name +
						" ?"
					}
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>
			</div>
			<br />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flex: 1,
					alignItems: "flex-end",
					justifyContent: "flex-end",
				}}
			>
				<CustomButton
					large={false}
					title="Delete!"
					onClick={() => deleteCategory()}
				/>
				<input
					type={"button"}
					style={cancelButton}
					value="Cancel"
					onClick={() => {
						props.setShowDeleteModal(false);
					}}
				/>
			</div>
		</div>
	);
};
export default DeleteModal;
