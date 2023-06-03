import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
// import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
const PrizeListing = (props) => {
	const columns = [
		{
			title: "",
			width: 80,
			render: (rowData) => (
				<img
					src={rowData.image}
					style={{ width: 52, height: 52, borderRadius: 8 }}
				/>
			),
		},
		{
			title: "CATEGORY NAME",
			// width: 120,
			render: (rowData) => {
				return (
					<div
					// style={{ width: 160 }}
					>
						<span className="label">{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "DESCRIPTION",
			render: (rowData) => {
				return (
					<div
					//style={{ width: 140 }}
					>
						<span className="label">{rowData.description}</span>
					</div>
				);
			},
		},
		{
			title: "Action",
			//key: "operation",
			fixed: "right",
			width: 120,
			//render: () =>
			render: (rowData) => (
				<Wrapper type="rowEvenAlign">
					<Tooltip placement="topLeft" title={"Edit"}>
						<div
							className={"centerAligner pointing actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setEditModal(true);
							}}
						>
							<FaRegEdit color="#6BA2E1" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner pointing actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setDeleteModal(true);
							}}
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
			return props.employeeListing;
		} else {
			if (props.filterBy) {
				return props.employeeListing.filter((item) =>
					item[props.filterBy]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			return props.employeeListing.filter((item) =>
				item.name.toLowerCase().includes(props.searchQuery.toLowerCase())
			);
		}
	};
	// console.log(
	// 	"result of functoin",
	// 	props.orderBy
	// 		? listing().sort((a, b) => {
	// 				if (a.category.toLowerCase() < b.category.toLowerCase()) {
	// 					return -1;
	// 				}
	// 				if (a.category.toLowerCase() > b.category.toLowerCase()) {
	// 					return 1;
	// 				}
	// 				return 0;
	// 		  })
	// 		: listing()
	// );
	return (
		<div style={{ width: "100%", backgroundColor: "#E5E5E5" }}>
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
						props.orderBy
							? listing().sort(
									(a, b) =>
										a[props.orderBy].toLowerCase() <
										b[props.orderBy].toLowerCase()
							  )
							: // {
							  // 		if (a.name.toLowerCase() < b.name.toLowerCase()) {
							  // 			return -1;
							  // 		}
							  // 		if (a.name.toLowerCase() > b.name.toLowerCase()) {
							  // 			return 1;
							  // 		}
							  // 		return 0;
							  //   })
							  listing()
					}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
