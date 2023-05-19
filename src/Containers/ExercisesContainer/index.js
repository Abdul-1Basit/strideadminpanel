import React from "react";
import { Modal, notification } from "antd";
import ProductCategorySearch from "./Search";
import AddProductCategory from "./Add";
import DeleteModal from "./Delete";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import ProductCategoryListing from "./Listing";
import { DeleteBodyStyle, DeleteModalStyle } from "../CommonStyles";
import {
	getAllExerciseCategories,
	getAllExercises,
} from "../../Helpers/firebase";
import { useNavigate } from "react-router-dom";

const ExercisesContainer = (props) => {
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = React.useState();
	const [addModal, setAddModal] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);
	const [filterBy, setFilterBy] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [topValues, setTopValues] = React.useState({
		totalPrograms: 0,
		activePrograms: 0,
		pendingPrograms: 0,
	});
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
	}, [showDeleteModal, addModal]);
	const getWorkouts = async () => {
		setLoading(true);

		let result = await getAllExercises();
		setCampaignListing(result);
		let totalPrograms = result.length,
			activePrograms = 0,
			pendingPrograms = 0;
		result.forEach((element) => {
			if (element.status) {
				element.status !== "Inactive" ? activePrograms++ : pendingPrograms++;
			}
		});
		setTopValues({
			totalPrograms,
			pendingPrograms,
			activePrograms,
		});
		setLoading(false);
	};
	const editThisProgram = (id) => {
		navigate("/exercises/edit/" + id);
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
			{addModal && <AddProductCategory {...{ setAddModal, successMessage }} />}

			{/* {editModal && (
				<EditCampaign
					{...{
						setEditModal,
						activeCategory,
						setActiveCategory,
						successMessage,
					}}
				/>
			)} */}

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
			{!addModal && !showDeleteModal && (
				<div>
					<div
						className="rowing"
						style={{
							marginBottom: 25,
							opacity: showDeleteModal || addModal ? 0.6 : 1,
						}}
					>
						<CustomSmallCard
							textColor="#fff"
							primaryColor="#F94F00"
							secondaryColor="rgba(255, 255, 255, 0.16)"
							icon={
								<img src="/bmbl.png" style={{ width: 38.75, height: 35.23 }} />
							}
							heading="Total Exercises"
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
							heading="Active Exercises"
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
							heading="Pending Exercises"
							// headingCount="120"
							subHeading={topValues.pendingPrograms}
							type=""
						/>
					</div>
					<div
						style={{
							// paddingLeft: 40,
							// paddingRight: 40,
							width: "100%",
							// backgroundColor: "#E5E5E5",
							background: "#FFFFFF",
							boxShadow: " 0px 0px 16px rgba(0, 0, 0, 0.16)",
							borderRadius: 20,
							paddingTop: 20,
							opacity: addModal || showDeleteModal ? 0.5 : 1,
							WebkitFilter:
								addModal || showDeleteModal ? "grayscale(1)" : "none",
						}}
					>
						<ProductCategorySearch
							{...{
								setAddModal,
								filterBy,
								setFilterBy,
								orderBy,
								setOrderBy,
								searchQuery,
								setSearchQuery,
							}}
						/>

						<ProductCategoryListing
							{...{
								setAddModal,
								setActiveCategory,
								loading,
								setShowDeleteModal,
								campaignListing,
								editThisProgram,
								filterBy,
								orderBy,
								searchQuery,
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ExercisesContainer;
