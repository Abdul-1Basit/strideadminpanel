import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
// import { RiDeleteBinLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
const PrizeListing = (props) => {
	const columns = [
		{
			title: "EXERCISE NAME",
			render: (rowData) => {
				return (
					<div style={{ width: 160 }}>
						<span className="label">{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "CATEGORY",

			// sorter: (a, b) => a.category.toLowerCase() - b.category.toLowerCase(),
			// sortDirections: ["ascend", "descend"],
			render: (rowData) => {
				return (
					<div style={{ width: 140 }}>
						<span className="label">{rowData.category}</span>
					</div>
				);
			},
		},
		{
			title: "STATUS",
			render: (rowData) => {
				return (
					<div
						className="exerciseStatusCapsule"
						style={{
							backgroundColor: "#5DB135",
							// rowData.status.toLowerCase() === "active"
							// 	? "#5DB135"
							// 	:
							// "#D30E0E",
							width: 140,
						}}
					>
						<span className="label" style={{ color: "#fff" }}>
							{rowData.status ? rowData.status.toString() : "Active"}
						</span>
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
							className={"centerAligner"}
							onClick={() => {
								// props.setActiveCategory(rowData);
								//console.log(rowData);
								props.editThisProgram(rowData.id);
							}}
						>
							<FaRegEdit color="#6BA2E1" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setShowDeleteModal(true);
							}}
						>
							<AiTwotoneDelete color="#EF4444" size={20} />
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
			return props.campaignListing;
		} else {
			if (props.filterBy) {
				return props.campaignListing.filter((item) =>
					item[props.filterBy]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			return props.campaignListing.filter((item) =>
				item[props.filterBy]
					.toLowerCase()
					.includes(props.searchQuery.toLowerCase())
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
					// rowSelection
					columns={columns}
					dataSource={
						props.orderBy
							? listing().sort((a, b) => {
									if (a.category.toLowerCase() < b.category.toLowerCase()) {
										return -1;
									}
									if (a.category.toLowerCase() > b.category.toLowerCase()) {
										return 1;
									}
									return 0;
							  })
							: listing()
					}
					// scroll={{
					// 	x: 1300,
					// }}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
