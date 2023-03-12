import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";

import { RiDeleteBinLine } from "react-icons/ri";
const PrizeListing = (props) => {
	const columns = [
		{
			title: "Name",
			width: 190,
			fixed: "left",
			render: (rowData) => {
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
							src={rowData.image ?? "/noImage.png"}
							style={{
								height: 40,
								width: 50,
								objectFit: "contain",
								marginRight: 10,
							}}
							alt={rowData.name + "workout image"}
						/>
						<span>{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "Target Area",
			width: 190,
			fixed: "left",
			render: (rowData) => {
				return (
					<div
						style={{
							flexDirection: "row",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
						}}
					>
						<span>{rowData.targetArea}</span>
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
							className={"centerAligner actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								//console.log(rowData);
								props.setEditModal(true);
							}}
						>
							<FiEdit color="#0F172A" />
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
						</div>{" "}
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
					dataSource={props.campaignListing}
					scroll={{
						x: 1300,
					}}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
