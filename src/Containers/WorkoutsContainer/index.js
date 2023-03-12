import React from "react";
import { Modal, notification } from "antd";
import ProductCategorySearch from "./Search";
import AddProductCategory from "./Add";
import EditCampaign from "./Edit";
import DeleteModal from "./Delete";
import ProductCategoryListing from "./Listing";
import {
	DeleteBodyStyle,
	DeleteModalStyle,
	ModalBodyStyle,
	ModalStyle,
} from "../CommonStyles";
import { getAllWorkouts } from "../../Helpers/firebase";

const WorkoutsContainer = (props) => {
	const [activeCategory, setActiveCategory] = React.useState();
	const [addModal, setAddModal] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [filterItem, setFilterItem] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const [campaignListing, setCampaignListing] = React.useState([]);
	const successMessage = (modalFunc, type, cat) => {
		let title = "";
		let subTitle = "";
		let catName = activeCategory.name ? activeCategory.name : "";
		if (type === "add") {
			title = "added";
			subTitle = "added to the list";
			catName = cat.name;
		} else if (type === "edit") {
			title = "edited";
			subTitle = "updated";
			catName = cat.name;
		} else if (type === "delete") {
			title = "deleted";
			subTitle = "deleted from the list";
		}
		modalFunc(false);

		notification.success({
			message: `Successfully ${title}!`,
			description: `${catName ?? ""}  has been successfully ${subTitle}`,
			placement: "topRight",
			duration: 3,
			onClose: function () {},
		});
		return;
	};
	React.useEffect(() => {
		getWorkouts();
	}, [editModal, showDeleteModal, addModal]);
	const getWorkouts = async () => {
		setLoading(true);
		let result = await getAllWorkouts();
		setCampaignListing(result);
		console.log("result", result);
		setLoading(false);
	};

	return (
		<div style={{ height: "100%", backgroundColor: "#E5E5E5", paddingTop: 52 }}>
			<div style={{ display: "flex", width: "100%" }}>
				<Modal
					visible={addModal}
					title=""
					onCancel={() => setAddModal(false)}
					closable={false}
					style={ModalStyle}
					bodyStyle={ModalBodyStyle}
					footer={null}
					destroyOnClose
				>
					<AddProductCategory {...{ setAddModal, successMessage }} />
				</Modal>

				<Modal
					visible={editModal}
					title=""
					onCancel={() => setEditModal(false)}
					closable={false}
					style={ModalStyle}
					bodyStyle={ModalBodyStyle}
					footer={null}
					destroyOnClose
				>
					<EditCampaign
						{...{
							setEditModal,
							activeCategory,
							setActiveCategory,
							successMessage,
						}}
					/>
				</Modal>

				<Modal
					visible={showDeleteModal}
					title=""
					onCancel={() => setShowDeleteModal(false)}
					closable={false}
					destroyOnClose
					style={DeleteModalStyle}
					bodyStyle={DeleteBodyStyle}
					footer={null}
				>
					{
						<DeleteModal
							{...{
								activeCategory,
								setActiveCategory,
								showDeleteModal,
								setShowDeleteModal,
								successMessage,
							}}
						/>
					}
				</Modal>
			</div>
			<div style={{ marginLeft: 40, marginRight: 40 }}>
				<ProductCategorySearch
					{...{
						setAddModal,
						filterItem,
						setFilterItem,
					}}
				/>

				<ProductCategoryListing
					{...{
						setEditModal,
						setAddModal,
						setActiveCategory,
						loading,
						setShowDeleteModal,
						campaignListing,
					}}
				/>
			</div>
		</div>
	);
};

export default WorkoutsContainer;
