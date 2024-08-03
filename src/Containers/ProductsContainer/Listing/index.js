import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegClone } from "react-icons/fa";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { MdVisibility, MdDelete } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";

const ProductListing = (props) => {
	const tempVar = "Voluptatem est dolores veritatis id mollitia quis deserunt";
	const columns = [
		{
			title: "",
			width: 35,
			render: (rowData) => (
				<div
					style={{
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						width: 35,
					}}
				>
					<img
						src={
							rowData.images.includes(",")
								? rowData.images.split(",")[0]
								: rowData.images
						}
						style={{ height: 40, width: 50, objectFit: "contain" }}
						alt={rowData.name + "immggg"}
					/>
				</div>
			),
		},
		// {
		// 	title: "PRODUCT ID",
		// 	width: 30,
		// 	render: (rowData) => (
		// 		<div
		// 			style={{
		// 				flexDirection: "row",
		// 				display: "flex",
		// 				alignItems: "flex-start",
		// 				justifyContent: "flex-start",
		// 				width: 30,
		// 			}}
		// 		>
		// 			<span className="label">
		// 				{rowData.id.toString().length > 5
		// 					? rowData.id.toString().substr(0, 5)
		// 					: rowData.id.toString()}
		// 			</span>
		// 		</div>
		// 	),
		// },
		{
			title: "PRODUCT NAME",
			dataIndex: "productName",
			width: 60,
			render: (productName) => (
				<span
					className="label"
					style={{
						width: 60,
					}}
				>
					{productName}
				</span>
			),
		},
		{
			title: "PRICE",
			dataIndex: "unitPrice",
			width: 30,
			render: (unitPrice) => (
				<span
					className="label"
					style={{
						width: 30,
					}}
				>
					${unitPrice}.00
				</span>
			),
		},
		{
			title: "DESCRIPTION",
			width: 100,
			render: (rowData) => (
				<span
					className="label"
					style={{
						width: 100,
						color: "#6A6A6A",
					}}
				>
					{rowData.description.length > 58
						? rowData.description.substr(0, 58) + "..."
						: rowData.description}

					{/* {tempVar.length} */}
				</span>
			),
		},
		{
			title: "In Stock",
			width: 30,
			render: (rowData) => (
				<div
					style={{
						height: 25,
						paddingLeft: 15,
						paddingRight: 15,
						borderRadius: 50,
						backgroundColor:
							rowData.noOfItems < 50
								? "#D30E0E"
								: rowData.noOfItems < 100
								? "#E2BB2E"
								: "#5DB135",
						textAlign: "center",
					}}
				>
					<span
						className="label"
						style={{
							width: 30,
							color: "#ffffff",
						}}
					>
						{rowData.noOfItems}
					</span>
				</div>
			),
		},
		{
			title: "Reviews",
			// dataIndex: "quantity",
			width: 20,
			render: (rowData) => {
				return (
					<span
						className="label"
						style={{
							width: 20,
						}}
					>
						{rowData.reviews}
					</span>
				);
			},
		},
		{
			title: "Action",
			width: 60,
			render: (rowData) => (
				<Wrapper type="rowEvenAlign" w={100}>
					<Tooltip placement="topLeft" title={"View"}>
						<div
							className={"centerAligner pointing actions"}
							style={{ marginRight: 10, cursor: "pointer" }}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setCloneModal(true);
							}}
						>
							<MdVisibility color="#2DAB22" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topLeft" title={"Edit"}>
						<div
							className={"centerAligner pointing actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setEditModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<FiEdit color="#0F172A" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner pointing actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setDeleteModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<RiDeleteBinLine color="#EF4444" size={20} />
						</div>
					</Tooltip>
				</Wrapper>
			),
		},
	];
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 25,
			}}
			spin
		/>
	);
	const listing = () => {
		if (!props.searchQuery) {
			return props.productsList;
		} else {
			// if (!props.filterItem) return props.productsList;
			if (props.filterItem) {
				return props.productsList.filter((item) =>
					item[props.filterItem]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			return props.productsList.filter((item) =>
				item.id.toLowerCase().includes(props.searchQuery.toLowerCase())
			);
		}
	};
	return (
		<div style={{ width: "100%", backgroundColor: "#f8f7f3" }}>
			{props.loading ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						paddingTop: 100,
					}}
				>
					<Spin indicator={antIcon} />
				</div>
			) : (
				<Table
					rowSelection
					columns={columns}
					dataSource={
						props.orderBy
							? listing().sort((a, b) => a[props.orderBy] < b[props.orderBy])
							: listing()
					}
				/>
			)}
		</div>
	);
};
export default ProductListing;
