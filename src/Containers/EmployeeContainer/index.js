import React from "react";
import { notification } from "antd";
import Add from "./Add";
import Edit from "./Edit";
import UserListing from "./Listing";
import UserSearch from "./Search";
import DeleteModal from "./Delete";
import Clone from "./Clone";
import { getAllEmployees } from "../../Helpers/firebase";
import Modal from "react-modal";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
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
const customCloneStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		paddingTop: 30,
		paddingBottom: 30,
		paddingRight: 60,
		paddingLeft: 60,
		// position: "absolute",
		width: 545,
		height: 304,
		left: 448,
		top: 236,
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
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
const EmployeesContainer = () => {
	const [addModal, setAddModal] = React.useState(false);
	const [filterItem, setFilterItem] = React.useState(-1);
	const [editModal, setEditModal] = React.useState(false);
	const [cloneModal, setCloneModal] = React.useState(false);
	const [activeCategory, setActiveCategory] = React.useState(null);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [employeeListing, setEmployeeListing] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const successMessage = (modalFunc, type, usr) => {
		let title = "";
		let subTitle = "";
		let fname = activeCategory.firstName;
		let lname = activeCategory.lastName;
		if (type === "add") {
			title = "added";
			subTitle = "added to the list";
			modalFunc(false);

			fname = usr.firstName ?? "";
			lname = usr.lastName ?? "";
		} else if (type === "edit") {
			title = "edited";
			subTitle = "updated";
			fname = usr.firstName;
			lname = usr.lastName;
		} else if (type === "delete") {
			title = "deleted";
			subTitle = "deleted from the list";
		}
		modalFunc(false);

		notification.success({
			message: `Successfully ${title}!`,
			description: `${fname + " " + lname}  has been successfully ${subTitle}`,
			placement: "topRight",
			duration: 3,
			onClose: function () {},
		});
	};
	React.useEffect(() => {
		getEmployees();
	}, [editModal, addModal, deleteModal, cloneModal]);
	const getEmployees = async () => {
		setLoading(true);
		let temporaryList = await getAllEmployees();
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
						<Add {...{ setAddModal, successMessage, employeeListing }} />
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
							setActiveCategory,
							successMessage,
						}}
					/>
				</Modal>
				<Modal
					isOpen={cloneModal}
					onRequestClose={() => setCloneModal(false)}
					style={customCloneStyles}
				>
					<Clone
						{...{
							setCloneModal,
							activeCategory,
							setActiveCategory,
							successMessage,
							employeeListing,
						}}
					/>
				</Modal>
				<Modal
					isOpen={deleteModal}
					onRequestClose={() => setCloneModal(false)}
					style={customDeleteStyles}
				>
					<DeleteModal
						{...{
							setDeleteModal,
							activeCategory,
							successMessage,
						}}
					/>
				</Modal>
			</div>
			<div
				className="rowing"
				style={{
					marginBottom: 25,
					opacity: deleteModal || addModal || editModal ? 0.6 : 1,
				}}
			>
				<CustomSmallCard
					textColor="#fff"
					primaryColor="#F94F00"
					secondaryColor="rgba(255, 255, 255, 0.16)"
					icon={
						<img src="/Icon2.png" style={{ width: 38.75, height: 35.23 }} />
					}
					heading="Total Employees"
					// headingCount="120"
					subHeading="50"
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
					heading="Active"
					// headingCount="120"
					subHeading="35"
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
					heading="Total Employees"
					// headingCount="120"
					subHeading="50"
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
					opacity: addModal || editModal || deleteModal ? 0.5 : 1,
					WebkitFilter:
						addModal || editModal || deleteModal ? "grayscale(1)" : "none",
				}}
			>
				<UserSearch setAddModal={setAddModal} setFilterItem={setFilterItem} />
				<br />
				<UserListing
					{...{
						employeeListing,
						filterItem,
						setEditModal,
						activeCategory,
						setActiveCategory,
						setDeleteModal,
						setCloneModal,
						loading,
					}}
				/>
			</div>
		</div>
	);
};
export default EmployeesContainer;
