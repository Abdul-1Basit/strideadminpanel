import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";

import { RiDeleteBinLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
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
							src={rowData.basicDetailMedia ?? "/noImage.png"}
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
						// style={{
						// 	flexDirection: "row",
						// 	display: "flex",
						// 	alignItems: "center",
						// 	justifyContent: "flex-start",
						// }}
						className="rowStart pNameUnderline"
						onClick={() => {
							props.viewThisWorkout(rowData.id);
						}}
					>
						<Tooltip placement="top" title={"Quick View"}>
							<span className="label">{rowData.name}</span>
						</Tooltip>
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
						<span className="label">
							{rowData.exercises
								? rowData.exercises.warmup.length +
								  " warmup, " +
								  rowData.exercises.workout.length +
								  " workout, " +
								  rowData.exercises.cooldown.length +
								  " cooldown "
								: ""}
						</span>
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
								rowData.status.toLowerCase() === "active"
									? "#5DB135"
									: rowData.status.toLowerCase() === "pending"
									? "#E2BB2E"
									: rowData.status.toLowerCase() === "draft"
									? "#7D7D7D"
									: "#F4F4F4",
							color:
								rowData.status.toLowerCase() === "active" ||
								rowData.status.toLowerCase() === "pending" ||
								rowData.status.toLowerCase() === "draft"
									? "#fff"
									: "#000000",
							// : "#E2BB2E",
						}}
					>
						<span className="tableContent" style={{ color: "#fff" }}>
							{rowData.status ?? "Active"}
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
					<Tooltip placement="topRight" title={"Duplicate"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								props.cloneThisWorkout(rowData.id);
								//console.log(rowData);
								// props.setEditModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<img src="/copySign.png" style={{ width: 22, height: 20 }} />
						</div>
					</Tooltip>
					<Tooltip placement="topLeft" title={"Edit"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								// props.setActiveCategory(rowData);
								// //console.log(rowData);
								// props.setEditModal(true);
								props.editThisWorkout(rowData.id);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<FiEdit color="#0F172A" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							className={"centerAligner actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setShowDeleteModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<RiDeleteBinLine color="#EF4444" size={20} />
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
		// orderBy,
		// 				filterBy,
		// 				searchProgramQuery,
		// 				searchUserQuery
		if (!props.searchProgramQuery && !props.searchUserQuery) {
			return props.campaignListing;
		}
		if (props.searchProgramQuery) {
			return props.filterBy === "id"
				? props.campaignListing.filter((item) =>
						item.id
							.toLowerCase()
							.includes(props.searchProgramQuery.toLowerCase())
				  )
				: props.campaignListing.filter((item) =>
						item.name
							.toLowerCase()
							.includes(props.searchProgramQuery.toLowerCase())
				  );
		}
		return props.filterBy === "name"
			? props.campaignListing.filter((item) =>
					item.id.toLowerCase().includes(props.searchUserQuery.toLowerCase())
			  )
			: props.campaignListing.filter((item) =>
					item.name.toLowerCase().includes(props.searchUserQuery.toLowerCase())
			  );
	};
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
						props.campaignListing
							? props.orderBy === "id"
								? listing().sort((a, b) => a.id < b.id)
								: listing().sort((a, b) => a.name.localeCompare(b.name))
							: []
						// {
						// 	id: 0,
						// 	workoutImage:
						// 		"https://firebasestorage.googleapis.com/v0/b/stride-gym.appspot.com/o/files%2FRectangle%2030.png?alt=media&token=f66ee0cd-98c2-4421-b602-e01b2349b715",
						// 	name: "Chest",
						// 	subtitle: "Upper, lower, back",
						// 	noOfExercises: 4,
						// 	status: "Active",
						// },
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
