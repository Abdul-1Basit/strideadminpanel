import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";

import { RiDeleteBinLine } from "react-icons/ri";
const PrizeListing = (props) => {
	const columns = [
		{
			title: "",
			width: 90,
			render: (rowData) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img
							src={rowData.workoutImage ?? "/noImage.png"}
							style={{
								height: 40,
								width: 50,
								objectFit: "contain",
								marginRight: 10,
								cursor: "pointer",
							}}
							alt={rowData.name + "workout image"}
						/>
					</div>
				);
			},
		},
		{
			title: "WORKOUT NAME",

			width: 190,

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
						<span className="label">{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "SUBTITLE",
			width: 190,
			// fixed: "left",
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
						<span className="label">{rowData.subtitle}</span>
					</div>
				);
			},
		},
		{
			title: "NO OF EXERCISES",
			width: 190,
			// fixed: "left",
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
						<span className="label">{rowData.noOfExercises}</span>
					</div>
				);
			},
		},
		{
			title: "STATUS",
			width: 190,
			// fixed: "left",
			render: (rowData) => {
				return (
					<div
						className="capsule"
						style={{
							backgroundColor:
								rowData.status === "Active" ? "#5DB135" : "#D30E0E",
							// : "#E2BB2E",
						}}
					>
						<span className="tableContent" style={{ color: "#fff" }}>
							{rowData.status}
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
							className={"centerAligner actions"}
							onClick={() => {
								// props.setActiveCategory(rowData);
								// //console.log(rowData);
								// props.setEditModal(true);
							}}
						>
							<FiEdit color="#0F172A" />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								// props.setActiveCategory(rowData);
								// props.setShowDeleteModal(true);
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
					dataSource={[
						{
							id: 0,
							workoutImage:
								"https://firebasestorage.googleapis.com/v0/b/stride-gym.appspot.com/o/files%2FRectangle%2030.png?alt=media&token=f66ee0cd-98c2-4421-b602-e01b2349b715",
							name: "Chest",
							subtitle: "Upper, lower, back",
							noOfExercises: 4,
							status: "Active",
						},
					]}
					// scroll={{
					// 	x: 1300,
					// }}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
