import React from "react";
// import Modal from "react-modal";
import { notification, Modal } from "antd";
import DeleteModal from "./Delete";
import AddProduct from "./AddProduct";
import EditProduct from "./Edit";
import ProductListing from "./Listing";
import ProductSearch from "./Search";
import Clone from "./Clone";
import { getAllProducts } from "../../Helpers/firebase";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { FaExclamation } from "react-icons/fa";
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
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// width: 713px;
		// height: 672px;
		// background: #FFFFFF;
		// border-radius: 16px
	},
};
const ProductsContainer = (props) => {
	// const [changedFilterItem, setChangedFilterItem] = React.useState(false);
	const [addModal, setAddModal] = React.useState(false);
	const [filterItem, setFilterItem] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [editModal, setEditModal] = React.useState(false);
	const [activeCategory, setActiveCategory] = React.useState(null);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [cloneModal, setCloneModal] = React.useState(false);
	const [productsList, setProductsList] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [topValues, setTopValues] = React.useState({
		listofProds: 0,
		outofStock: 0,
	});
	const successMessage = (modalFunc, type, cat) => {
		let title = "";
		let subTitle = "";
		let catName = activeCategory.name;
		if (type === "add") {
			title = "added";
			subTitle = "added to the list";
			catName = cat.name ? cat.name : "Product";
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
			description: `${catName}  has been successfully ${subTitle}`,
			placement: "topRight",
			duration: 3,
			onClose: function () {},
		});
		return;
	};

	React.useEffect(() => {
		getData();
	}, [addModal, editModal, deleteModal, cloneModal]);
	const getData = async () => {
		setLoading(true);
		const response = await getAllProducts();
		setProductsList(response);
		let listofProds = response.length;
		let outofStock = 0;
		response.forEach((element) => {
			if (element.noOfItems <= 20) {
				outofStock++;
			}
		});
		setTopValues({
			listofProds,
			outofStock,
		});
		console.log("response", response);
		setLoading(false);
	};

	return (
		<div
			style={{
				height: "100%",
				backgroundColor: "#f8f7f3",
				paddingTop: 52,
				width: "100%",
				borderBottomLeftRadius: 72,
				borderTopLeftRadius: 72,
				paddingLeft: 38,
				paddingRight: 25,
			}}
		>
			<div style={{ width: "100%" }}>
				<Modal
					visible={addModal}
					title=""
					onCancel={() => setAddModal(false)}
					closable={false}
					footer={null}
					// style={{ maxWidth: "100%" }}
					destroyOnClose
					// isOpen={addModal}
					// onRequestClose={() => setAddModal(false)}
					// // style={customStyles}

					className="addProductModal"
					// contentLabel="Example Modal"
				>
					<div>
						<AddProduct {...{ setAddModal, successMessage, productsList }} />
					</div>
				</Modal>
				<Modal
					visible={cloneModal}
					title=""
					onCancel={() => setCloneModal(false)}
					closable={false}
					className="addProductModal"
					footer={null}
					// style={{ maxWidth: "100%" }}
					destroyOnClose
				>
					<Clone
						{...{
							setCloneModal,
							successMessage,
							activeCategory,
							productsList,
						}}
					/>
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
					className="addProductModal"
					footer={null}
				>
					<EditProduct
						setEditModal={setEditModal}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						successMessage={successMessage}
					/>
				</Modal>
			</div>
			<div className="rowing" style={{ marginBottom: 25 }}>
				<CustomSmallCard
					textColor="#fff"
					primaryColor="#F94F00"
					secondaryColor="rgba(255, 255, 255, 0.16)"
					icon={<img src="/Icon.png" style={{ width: 38.75, height: 35.23 }} />}
					heading="Products Listed"
					// headingCount="120"
					subHeading={topValues.listofProds}
					type=""
				/>
				<CustomSmallCard
					textColor="#D18A00"
					primaryColor="rgba(209, 138, 0, 0.08)"
					secondaryColor="rgba(209, 138, 0, 0.16)"
					icon={
						<FaExclamation
							style={{ width: 38.75, height: 35.23, color: "#D18A00" }}
						/>
					}
					heading="Products"
					headingCount={topValues.outofStock}
					subHeading="running out of stock"
					type="productSecond"
				/>
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						flexDirection: "column",
					}}
				>
					<div className="rowing" style={{ marginBottom: 20 }}>
						<div
							className="capsuleSmol"
							style={{ backgroundColor: "#5DB135" }}
						/>
						<span className="capsuleText">
							Products stock greater than 100 units
						</span>
					</div>
					<div className="rowing" style={{ marginBottom: 20 }}>
						<div
							className="capsuleSmol"
							style={{ backgroundColor: "#E2BB2E" }}
						/>
						<span className="capsuleText">
							Products stock less than 100 units
						</span>
					</div>
					<div className="rowing" style={{ marginBottom: 20 }}>
						<div
							className="capsuleSmol"
							style={{ backgroundColor: "#D30E0E" }}
						/>
						<span className="capsuleText">
							Products stock less than 50 units
						</span>
					</div>
				</div>
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
				<ProductSearch
					{...{
						setAddModal,
						filterItem,
						setFilterItem,
						orderBy,
						setOrderBy,
						searchQuery,
						setSearchQuery,
					}}
				/>
				<ProductListing
					{...{
						filterItem,
						setEditModal,
						setActiveCategory,
						setDeleteModal,
						setCloneModal,
						loading,
						productsList,
						searchQuery,
						orderBy,
					}}
				/>
			</div>
		</div>
	);
};

export default ProductsContainer;
