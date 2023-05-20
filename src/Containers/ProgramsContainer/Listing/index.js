import React from "react";
import { Table, Spin, Tooltip } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
// import { AiFillEye } from "react-icons/ai";
import { FaClone } from "react-icons/fa";
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
						// style={{
						// 	flexDirection: "row",
						// 	display: "flex",
						// 	alignItems: "center",
						// 	justifyContent: "flex-start",
						// }}
						className="rowStart pNameUnderline"
						onClick={() => {
							props.viewThisProgram(rowData.id);
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
								rowData.status === "Active"
									? "#5DB135"
									: rowData.status === "Draft"
									? "#7D7D7D"
									: "#D30E0E",
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
			fixed: "right",
			width: 120,
			render: (rowData) => (
				<Wrapper type="rowEvenAlign">
					<Tooltip placement="topRight" title={"Duplicate"}>
						<div
							className={"centerAligner"}
							onClick={() => {
								props.cloneThisProgram(rowData.id);
								//console.log(rowData);
								// props.setEditModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<img src="/copySign.png" style={{ width: 22, height: 20 }} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Edit"}>
						<div
							className={"centerAligner"}
							onClick={() => {
								props.editThisProgram(rowData.id);
								//console.log(rowData);
								// props.setEditModal(true);
							}}
							style={{ marginRight: 10, cursor: "pointer" }}
						>
							<FiEdit color="#0F172A" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
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
					</Tooltip>
					<Tooltip placement="topRight" title={"Share"}>
						<div
							className={"centerAligner"}
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

	const sortedList = () => {
		// return props.programList;
		// if (!props.sortBy) {
		// 	return props.programList;
		// }
		// let newList = props.programList;
		// if (props.sortBy) {
		// 	 newList=newList.sort((a,b)=>a.id-b.id)
		// }
		// console.log("orderbyquery", props.programList[0].id);
		let newList = [...props.programList];
		// if (props.orderBy) {
		// 	let arr =
		// 		props.orderBy === "id"
		// 			? newList.sort((a, b) => a.id < b.id)
		// 			: newList.sort((a, b) => a.id < b.id);
		// 	return arr;
		// }

		if (!props.searchUserQuery && !props.searchProgramQuery) return newList;
		if (props.searchProgramQuery) {
			if (props.filterBy)
				return newList.filter((a) =>
					a[props.filterBy].toLowerCase().includes(props.searchProgramQuery)
				);
			return newList.filter((a) =>
				a.name.toLowerCase().includes(props.searchProgramQuery)
			);
		}

		return newList;
		// return props.filterBy?props.programList.filter((a) => a[props.filterBy].toLowerCase().includes(props.searchUserQuery)):props.programList.filter((a) => a.name.toLowerCase().includes(props.searchUserQuery))
	};

	return (
		<div style={{ width: "100%", backgroundColor: "#E5E5E5" }}>
			{/* {props.orderBy} */}
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
							? sortedList().sort(
									(a, b) =>
										a[props.orderBy].toLowerCase() <
										b[props.orderBy].toLowerCase()
							  )
							: sortedList()
					}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
