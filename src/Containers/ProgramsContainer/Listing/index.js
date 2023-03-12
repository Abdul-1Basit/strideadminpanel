import React from "react";
import { Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
const PrizeListing = (props) => {
	// name,
	// subTitle,
	// status,
	// difficultyLevel,
	// scheduleDescription,
	// overviewDescription,
	// days,
	// overviewMediaOne,
	// overviewMediaTwo,
	// scheduleImage,
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
							src={rowData.overviewMediaOne ?? "/noImage.png"}
							style={{
								height: 40,
								width: 50,
								objectFit: "contain",
								marginRight: 10,
								cursor: "pointer",
							}}
							alt={rowData.name + "program image"}
						/>
					</div>
				);
			},
		},
		{
			title: "PROGRAM NAME",
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
			title: "OVERVIEW",
			// width: 190,
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
							{rowData.overviewDescription.length > 54
								? rowData.overviewDescription.substr(0, 54)
								: rowData.overviewDescription}
							...
						</span>
					</div>
				);
			},
		},
		{
			title: "NO. OF DAYS",
			// width: 190,
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
						<span className="label">{rowData.days.length} days</span>
					</div>
				);
			},
		},
		{
			title: "STATUS",
			// width: 190,
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
			title: "DIFFICULTY",
			// width: 190,
			// fixed: "left",
			render: (rowData) => {
				return <span className="label">{rowData.difficultyLevel}</span>;
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
					<div
						className={"centerAligner"}
						onClick={() => {
							props.setActiveCategory(rowData);
							//console.log(rowData);
							props.setEditModal(true);
						}}
						style={{ marginRight: 10, cursor: "pointer" }}
					>
						<AiFillEye color="#2DAB22" size={20} />
					</div>
					<div
						className={"centerAligner"}
						onClick={() => {
							props.editThisProgram(rowData.id);
							//console.log(rowData);
							props.setEditModal(true);
						}}
						style={{ marginRight: 10, cursor: "pointer" }}
					>
						<FiEdit color="#0F172A" size={20} />
					</div>
					<div
						className={"centerAligner"}
						onClick={() => {
							props.setActiveCategory(rowData);
							props.setShowDeleteModal(true);
						}}
						style={{ marginRight: 10, cursor: "pointer" }}
					>
						<RiDeleteBinLine color="#EF4444" size={20} />
					</div>
					<div
						className={"centerAligner"}
						onClick={() => {
							props.setActiveCategory(rowData);
							props.setShowDeleteModal(true);
						}}
						style={{ marginRight: 10, cursor: "pointer" }}
					>
						<BsShareFill color="#7D7D7D" size={20} />
					</div>
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
					dataSource={props.programList}
					// scroll={{
					// 	x: 1300,
					// }}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
