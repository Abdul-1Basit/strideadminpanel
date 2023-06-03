import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
// import { RiDeleteBinLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
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
							className={"centerAligner pointing actions"}
							onClick={() => {
								props.editThisProgram(rowData.id);
							}}
						>
							<FaRegEdit color="#6BA2E1" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setShowDeleteModal(true);
							}}
						>
							<RiDeleteBinLine color="#EF4444" />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Share"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								// props.setActiveCategory(rowData);
								// props.setShowDeleteModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<BsShareFill color="#7D7D7D" size={20} />
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
					// rowSelection
					columns={columns}
					dataSource={
						props.orderBy
							? listing().sort(
									(a, b) =>
										a[props.orderBy].toLowerCase() <
										b[props.orderBy].toLowerCase()
							  )
							: // 		if (a.category.toLowerCase() < b.category.toLowerCase()) {
							  // 			return -1;
							  // 		}
							  // 		if (a.category.toLowerCase() > b.category.toLowerCase()) {
							  // 			return 1;
							  // 		}
							  // 		return 0;
							  //   })
							  listing()
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
