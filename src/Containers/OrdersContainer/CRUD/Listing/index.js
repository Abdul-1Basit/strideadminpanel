import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../../Components/Wrapper";
import { primaryColor } from "../../../../Constants";
import "./index.css";
const Listing = (props) => {
	const columns = [
		{
			title: "ORDER ID",
			width: 90,
			render: (rowData) => (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<span className="tableContent">
						{rowData.id.toString().length > 5
							? rowData.id.toString().substr(0, 5)
							: rowData.id.toString()}
					</span>
				</div>
			),
		},
		{
			title: "CREATED",
			// dataIndex: "created",
			width: 70,
			render: (rowData) => (
				<div
					style={{
						flexDirection: "column",
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}
				>
					{/* <span style={{ color: "grey" }}>{rowData.startTime}</span> */}
					<span className="tableContent">{rowData.orderCreated}</span>
					<span className="timeLabel">{rowData.orderTime}</span>
				</div>
			),
		},
		{
			title: "CUSTOMER",
			width: 100,
			render: (rowData) => (
				<span style={{ width: 120 }} className="tableContent">
					Jack Jones
				</span>
			),
		},
		{
			title: "PRODUCTS",
			width: 120,
			render: (rowData) => (
				<div
					style={{
						width: 130,
					}}
				>
					<span className="timeLabel">product</span>
					{/* {props.usersList && props.usersList.length > 0 && ( */}

					{/* {rowData.productList.map((innerItem, innerIndex) => {
						return (
							<div
								style={{
									flexDirection: "row",
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							>
								<img
									src={
										props.productList.find((item) => item.id === innerItem)
											.images
									}
									style={{ height: 60, width: 40, objectFit: "contain" }}
									alt={rowData.innerItem + "immggg"}
								/>
								<span style={{ paddingLeft: 5 }}>
									{props.productList.find((item) => item.id === innerItem).name}
								</span>
							</div>
						);
					})} */}
				</div>
			),
		},
		{
			title: "DELIVERY STATUS",
			width: 130,
			render: (rowData) => (
				<div
					className="capsule"
					style={{
						backgroundColor:
							rowData.deliveryStatus === "Fullfilled" ||
							rowData.deliveryStatus === "Fulfilled"
								? "#5DB135"
								: rowData.deliveryStatus === "Cancelled"
								? "#D30E0E"
								: "#E2BB2E",
					}}
				>
					<span className="tableContent" style={{ color: "#fff" }}>
						{rowData.deliveryStatus}
					</span>
				</div>
			),
		},
		{
			title: "ADDRESS",
			width: 140,
			render: (rowData) => (
				<div style={{ width: 140 }}>
					<span className="timeLabel">{rowData.address}</span>,
				</div>
			),
		},
		{
			title: "PRICE",
			width: 52,
			render: (rowData) => (
				<span className="tableContent">{rowData.grandTotal}$</span>
			),
		},
	];
	// const filteredOrderList = props.orderList;

	const listing = () => {
		let newList = [...props.orderList];
		if (props.orderBy) {
			newList =
				props.orderBy === "id"
					? props.orderList.sort((a, b) => a.id < b.id)
					: props.orderList.sort((a, b) => a.orderCreated < b.orderCreated);
		}
		if (!props.searchQuery) {
			return newList;
		} else {
			if (props.filterBy) {
				newList = newList.filter((item) =>
					item[props.filterBy]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			// return props.employeeListing.filter((item) =>
			// 	item.fullName.toLowerCase().includes(props.searchQuery.toLowerCase())
			// );
		}
		return newList;
	};

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 25,
			}}
			spin
		/>
	);
	return (
		<div style={{ width: "100%" }}>
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
					columns={columns}
					dataSource={
						// props.employeeListing
						// 	? props.orderBy
						// 		? listing().sort(
						// 				(a, b) =>
						// 					a[props.orderBy].toLowerCase() <
						// 					b[props.orderBy].toLowerCase()
						// 		  )
						// 		: listing()
						// 	: []
						listing()
					}
				/>
			)}
		</div>
	);
};
export default Listing;
