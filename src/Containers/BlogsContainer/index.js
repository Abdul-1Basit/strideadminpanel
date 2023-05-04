import React from "react";
import { Modal, notification } from "antd";
import ProductCategorySearch from "./Search";
// import EditCampaign from "./Edit";
import DeleteModal from "./Delete";
import ProductCategoryListing from "./Listing";
import {
	DeleteBodyStyle,
	DeleteModalStyle,
	ModalBodyStyle,
	ModalStyle,
} from "../CommonStyles";
import { getAllBlogs } from "../../Helpers/firebase";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
const BlogsContainer = (props) => {
	const [activeCategory, setActiveCategory] = React.useState();
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [filterBy, setFilterBy] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [topValues, setTopValues] = React.useState({
		totalPrograms: 0,
		activePrograms: 0,
		pendingPrograms: 0,
	});
	const [blogList, setBlogList] = React.useState([]);
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
	}, [editModal, showDeleteModal]);
	const getWorkouts = async () => {
		setLoading(true);
		let result = await getAllBlogs();
		setBlogList(result);
		let totalPrograms = result.length,
			activePrograms = 0,
			pendingPrograms = 0;
		result.forEach((rowData) => {
			rowData.status === "Active" ? activePrograms++ : pendingPrograms++;
		});
		setTopValues({
			totalPrograms,
			pendingPrograms,
			activePrograms,
		});
		// console.log("result", result);
		setLoading(false);
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
					opacity: showDeleteModal || editModal ? 0.6 : 1,
				}}
			>
				<CustomSmallCard
					textColor="#fff"
					primaryColor="#F94F00"
					secondaryColor="rgba(255, 255, 255, 0.16)"
					icon={
						<img src="/Icon2.png" style={{ width: 38.75, height: 35.23 }} />
					}
					heading="Total Blogs"
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
					heading="Active Blogs"
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
					heading="Inactive Blogs"
					// headingCount="120"
					subHeading={topValues.pendingPrograms}
					type=""
				/>
			</div>
			<div
				style={{
					width: "100%",
					background: "#FFFFFF",
					boxShadow: " 0px 0px 16px rgba(0, 0, 0, 0.16)",
					borderRadius: 20,
					paddingTop: 20,
					opacity: editModal || showDeleteModal ? 0.5 : 1,
					WebkitFilter: editModal || showDeleteModal ? "grayscale(1)" : "none",
				}}
			>
				<ProductCategorySearch
					{...{
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
						setEditModal,
						setActiveCategory,
						loading,
						setShowDeleteModal,
						blogList,
						filterBy,
						orderBy,
						searchQuery,
					}}
				/>
			</div>
		</div>
	);
};

export default BlogsContainer;
