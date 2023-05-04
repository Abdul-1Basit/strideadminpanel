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
import { RxCross2 } from "react-icons/rx";
import { BsCheck } from "react-icons/bs";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { useNavigate } from "react-router-dom";

const WorkoutsContainer = (props) => {
	const navigate = useNavigate();
	const [topValues, setTopValues] = React.useState({
		totalPrograms: 0,
		activePrograms: 0,
		pendingPrograms: 0,
	});
	const [activeCategory, setActiveCategory] = React.useState();
	const [addModal, setAddModal] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	// const [filterItem, setFilterItem] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [filterBy, setFilterBy] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchProgramQuery, setSearchProgramQuery] = React.useState("");
	const [searchUserQuery, setSearchUserQuery] = React.useState("");
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
		let totalPrograms = result.length,
			activePrograms = 0,
			pendingPrograms = 0;
		result.forEach((element) => {
			element.status !== "Inactive" ? activePrograms++ : pendingPrograms++;
		});
		setTopValues({
			totalPrograms,
			pendingPrograms,
			activePrograms,
		});
		// console.log("result", result);
		setLoading(false);
	};
	const editThisWorkout = (id) => {
		navigate("/workouts/edit/" + id);
	};

	return (
		<div
			style={{
				height: "100%",
				paddingTop: 52,
				paddingLeft: 40,
				paddingRight: 40,
			}}
		>
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
			<div
				className="rowing"
				style={{
					marginBottom: 25,
					// opacity: deleteModal || addModal || editModal ? 0.6 : 1,
				}}
			>
				<CustomSmallCard
					textColor="#fff"
					primaryColor="#F94F00"
					secondaryColor="rgba(255, 255, 255, 0.16)"
					icon={<img src="/bmbl.png" style={{ width: 38.75, height: 35.23 }} />}
					heading="Total Workouts"
					// headingCount="120"
					subHeading={topValues.totalPrograms}
					type=""
				/>
				<CustomSmallCard
					textColor="#2DAB22"
					primaryColor="rgba(33, 201, 18, 0.08)"
					secondaryColor="rgba(45, 171, 34, 0.16)"
					icon={
						<BsCheck
							style={{ width: 38.75, height: 35.23, color: "#2DAB22" }}
						/>
					}
					heading="Active Workouts"
					// headingCount="120"
					subHeading={topValues.activePrograms}
					type=""
				/>
				<CustomSmallCard
					textColor="#D30E0E"
					primaryColor="rgba(211, 14, 14, 0.08)"
					secondaryColor="rgba(211, 14, 14, 0.16)"
					icon={
						<RxCross2
							style={{ width: 38.75, height: 35.23, color: "#D30E0E" }}
						/>
					}
					heading="Pending Workouts"
					// headingCount="120"
					subHeading={topValues.pendingPrograms}
					type=""
				/>
			</div>
			<div
				style={{
					width: "100%",
					// backgroundColor: "#E5E5E5",
					background: "#FFFFFF",
					boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.16)",
					borderRadius: 20,
					paddingTop: 20,
					opacity: showDeleteModal ? 0.5 : 1,
					WebkitFilter: showDeleteModal ? "grayscale(1)" : "none",
				}}
			>
				<ProductCategorySearch
					{...{
						setAddModal,

						orderBy,
						setOrderBy,
						filterBy,
						setFilterBy,
						setSearchProgramQuery,
						searchProgramQuery,
						searchUserQuery,
						setSearchUserQuery,
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
						editThisWorkout,
						orderBy,
						filterBy,
						searchProgramQuery,
						searchUserQuery,
					}}
				/>
			</div>
		</div>
	);
};

export default WorkoutsContainer;
