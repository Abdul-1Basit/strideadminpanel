import React from "react";
import { Modal, notification } from "antd";
import AddUser from "./Add";
import EditUser from "./Edit";
import UserListing from "./Listing";
import UserSearch from "./Search";
import DeleteModal from "./Delete";
import { getAllUsers } from "../../Helpers/firebase";

const UsersContainer = () => {
	const [addModal, setAddModal] = React.useState(false);
	const [filterItem, setFilterItem] = React.useState("");
	const [editModal, setEditModal] = React.useState(false);
	const [activeCategory, setActiveCategory] = React.useState(null);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [usersListing, setUsersListing] = React.useState([]);
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
		getUsersList();
	}, [editModal, addModal, deleteModal, filterItem]);
	const getUsersList = async () => {
		setLoading(true);
		let temporaryList = await getAllUsers();
		setUsersListing(temporaryList);
		setLoading(false);
	};
	return (
		<div
			style={{
				height: "100%",
				backgroundColor: "#F8F7F3",
				paddingTop: 48,
				paddingLeft: 38,
				paddingRight: 25,
			}}
		>
			<div style={{ display: "flex", width: "100%", maxWidth: 200 }}>
				<Modal
					visible={addModal}
					title=""
					onCancel={() => {
						setAddModal(false);
						Modal.destroyAll();
					}}
					closable={false}
					className="smallModalStyle"
					footer={null}
					destroyOnClose
				>
					<AddUser {...{ setAddModal, successMessage }} />
				</Modal>
				<Modal
					visible={deleteModal}
					title=""
					onCancel={() => setDeleteModal(false)}
					closable={false}
					className="DeleteModalStyle"
					footer={null}
					destroyOnClose
				>
					<DeleteModal
						{...{
							setDeleteModal,
							activeCategory,
							setActiveCategory,
							successMessage,
						}}
					/>
				</Modal>
				<Modal
					visible={editModal}
					title=""
					onCancel={() => setEditModal(false)}
					closable={false}
					className="smallModalStyle"
					footer={null}
					destroyOnClose
				>
					<EditUser
						{...{
							setEditModal,
							activeCategory,
							setActiveCategory,
							successMessage,
						}}
					/>
				</Modal>
			</div>
			<div
				style={{
					paddingLeft: 32,
					paddingRight: 30,
					width: "100%",
					backgroundColor: "#fff",
					paddingTop: 19,
					boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.16)",
					borderRadius: 20,
				}}
			>
				<UserSearch setAddModal={setAddModal} setFilterItem={setFilterItem} />
				<br />
				<UserListing
					{...{
						usersListing,
						filterItem,
						setEditModal,
						activeCategory,
						setActiveCategory,
						setDeleteModal,
						loading,
					}}
				/>
			</div>
		</div>
	);
};
export default UsersContainer;
