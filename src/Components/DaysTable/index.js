import React from "react";
import { Tooltip, Table, Spin } from "antd";
// import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import { RiDeleteBinLine } from "react-icons/ri";
// import { BsShareFill } from "react-icons/bs";
// import { AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Wrapper from "../Wrapper";
const DaysTable = (props) => {
	const columns = [
		{
			title: "",
			width: 40,
			render: () => {},
		},
		{
			title: "Days#",
			width: 40,
			align: "center",
			render: (rowData) => {
				return (
					<div
						className="dayLabel"
						onClick={() => {
							props.viewDetails(rowData.id);
						}}
					>
						<span className="primaryRowLabel">Day {rowData.id + 1}</span>
					</div>
				);
			},
		},
		{
			title: "WARM UP",
			width: 190,
			align: "center",
			render: (rowData) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<span className="label">
							{rowData.warmup && rowData.warmup.length} Exercises
						</span>
					</div>
				);
			},
		},
		{
			title: "WORKOUT",
			width: 190,
			align: "center",
			render: (rowData) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<span className="label">
							{rowData.workout && rowData.workout.length} Exercises
						</span>
					</div>
				);
			},
		},
		{
			title: "COOL DOWN",
			width: 190,
			align: "center",
			render: (rowData) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<span className="label">
							{rowData.cooldown && rowData.cooldown.length} Exercises
						</span>
					</div>
				);
			},
		},
		{
			title: "ACTION",
			width: 120,
			align: "center",
			render: (rowData) => (
				<div className="aligningCenter">
					<div
						className={"centerAligner mr iconPointer"}
						onClick={() => {
							// props.viewDetails(rowData.id);
							props.viewDetails(rowData.id);
						}}
					>
						<Tooltip title="Edit">
							<BiEdit color="#6BA2E1" size={20} />
						</Tooltip>
					</div>
					<div
						className={"centerAligner mr iconPointer"}
						onClick={() => {
							props.disabledOption
								? console.log("disabled")
								: props.deleteMe(rowData.id);
						}}
					>
						<Tooltip title="Delete">
							<RiDeleteBinLine color="#EF4444" size={20} />
						</Tooltip>
					</div>
				</div>
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
					dataSource={props.data.length > 0 ? props.data : []}
				/>
			)}
		</div>
	);
};

export default DaysTable;
