import React from "react";
// import { notification } from "antd";
import Add from "./Add";
import Edit from "./Edit";
import UserListing from "./Listing";
import UserSearch from "./Search";
import DeleteModal from "./Delete";
// import Clone from "./Clone";
import {
	// getAllEmployees,
	getAllExerciseCategories,
} from "../../Helpers/firebase";
import Modal from "react-modal";
// import CustomSmallCard from "../../Components/CustomSmallCard";
// import { BsCheck } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";
const customStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: 713,
		height: 620,
		backgroundColor: "#FFF",
		borderRadius: 16,
		borderTopStartRadius: 16,
		paddingLeft: 60,
		paddingRight: 25,
		paddingTop: 30,
		paddingBottom: 30,
		marginBottom: 20,
		overflowX: "hidden",
	},
};
const customDeleteStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		paddingTop: 30,
		paddingBottom: 30,
		paddingRight: 60,
		paddingLeft: 60,
		// position: "absolute",
		width: 517,
		height: 247,
		left: 448,
		top: 236,
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
	},
};
const ExerciseCategoryContainer = () => {
	const [addModal, setAddModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [activeCategory, setActiveCategory] = React.useState(null);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [employeeListing, setEmployeeListing] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [filterBy, setFilterBy] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");

	React.useEffect(() => {
		getExerciseCtgrys();
	}, [editModal, addModal, deleteModal]);
	const getExerciseCtgrys = async () => {
		setLoading(true);
		let temporaryList = await getAllExerciseCategories();
		setEmployeeListing(temporaryList);
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
			<div
				style={{
					display: "flex",
					width: "100%",
					// maxWidth: 713,
					// backgroundColor: "#fff",
				}}
			>
				<Modal
					isOpen={addModal}
					onRequestClose={() => setAddModal(false)}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<div>
						<Add {...{ setAddModal }} />
					</div>
				</Modal>
				<Modal
					isOpen={editModal}
					onRequestClose={() => setEditModal(false)}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<Edit
						{...{
							setEditModal,
							activeCategory,
						}}
					/>
				</Modal>
				<Modal
					isOpen={deleteModal}
					onRequestClose={() => setDeleteModal(false)}
					style={customDeleteStyles}
				>
					<DeleteModal
						{...{
							setDeleteModal,
							activeCategory,
						}}
					/>
				</Modal>
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
					opacity: addModal || editModal || deleteModal ? 0.5 : 1,
					WebkitFilter:
						addModal || editModal || deleteModal ? "grayscale(1)" : "none",
				}}
			>
				<UserSearch
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
				<br />
				<UserListing
					{...{
						employeeListing,
						setEditModal,
						setActiveCategory,
						setDeleteModal,
						loading,
						filterBy,
						orderBy,
						searchQuery,
					}}
				/>
			</div>
		</div>
	);
};
export default ExerciseCategoryContainer;
