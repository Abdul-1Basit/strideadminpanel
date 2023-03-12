import React from "react";
import { notification, Spin } from "antd";
import Typography from "../../../../Components/Typography";
import CustomButton from "../../../../Components/CustomButton";
import { cancelButton } from "../../../CommonStyles";
import Wrapper from "../../../../Components/Wrapper";
import { deleteOrder } from "../../../../Helpers/firebase";
const Delete = (props) => {
	//console.log(props.activeCategory)
	const [loading, setLoading] = React.useState(false);
	const deleteCategory = async () => {
		// const resp=await apiDeleteRequest(endpoints.deleteProduct,{
		// "productId":parseInt(props.activeCategory.productId)
		// })
		// if(resp.status===200){
		setLoading(true);
		if (await deleteOrder(props.activeOrder)) {
			notification.success({
				message: `Successfully Deleted!`,
				description: `Order has been successfully deleted`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setDeleteModal(false);
					setLoading(false);
				},
			});
			return;
			// }}
		} else {
			notification.error({
				message: `Failed to delete!`,
				description: `try again later`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setDeleteModal(false);
				},
			});
		}
	};

	// React.useEffect(() => {}, []);
	return (
		<Wrapper type="flexCol">
			<div>
				<Typography
					alignment="center"
					title={
						"Are you sure you want to delete " + props.activeOrder.id + " ?"
					}
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>
			</div>
			<br />
			<Wrapper type="rowEnd">
				{loading ? (
					<Spin size="large" />
				) : (
					<CustomButton
						large={false}
						title="Delete!"
						onClick={() => deleteCategory()}
					/>
				)}
				<input
					type={"button"}
					style={cancelButton}
					value="Cancel"
					onClick={() => {
						props.setDeleteModal(false);
					}}
				/>
			</Wrapper>
		</Wrapper>
	);
};
export default Delete;
