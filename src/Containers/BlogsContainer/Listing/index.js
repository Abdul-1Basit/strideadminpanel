import React from "react";
import { Tooltip, Table, Spin } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { FiEdit } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
// import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const PrizeListing = (props) => {
	const navigate = useNavigate();
	const columns = [
		{
			title: "",
			width: 60,
			render: (rowData) => (
				<img
					src={rowData.image}
					style={{ width: 52, height: 52, borderRadius: 8 }}
				/>
			),
		},
		{
			title: "NAME",
			width: 100,
			render: (rowData) => {
				return (
					<div
						style={{
							flexDirection: "row",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							width: 100,
						}}
					>
						<span className="label">{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "DESCRIPTION",
			width: 190,
			render: (rowData) => {
				return (
					<span className="label" style={{ width: 190 }}>
						{rowData.description.length > 43
							? rowData.description.substr(0, 43)
							: rowData.description}
						...
					</span>
				);
			},
		},
		{
			title: "Blog Type",
			width: 100,
			render: (rowData) => {
				return (
					<div
						// className="capsule"
						style={{
							display: "flex",
							alignItems: "flex-start",
						}}
					>
						<span
							className="tableContent"
							style={{ textTransform: "capitalize" }}
						>
							{rowData.blogType}
						</span>
					</div>
				);
			},
		},
		{
			title: "STATUS",
			width: 100,
			render: (rowData) => {
				return (
					<div
						className="capsule"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							alignSelf: "center",
							backgroundColor:
								rowData.status === "Active" ? "#5DB135" : "#D30E0E",
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
			title: "DATE CREATED",
			width: 150,
			render: (rowData) => {
				return (
					<span className="label">
						{rowData.dateCreated
							? moment(rowData.dateCreated.toString()).format(
									"MMMM Do YYYY, h:mm:ss a"
							  )
							: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")}
					</span>
				);
			},
		},
		{
			title: "ACTION",
			width: 150,
			render: (rowData) => (
				<Wrapper type="rowEvenAlign">
					<Tooltip placement="topRight" title={"Edit"}>
						<div
							onClick={() => {
								navigate("/blogs/edit/" + rowData.id);
							}}
							style={{ cursor: "pointer" }}
						>
							<FiEdit color="#0F172A" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setShowDeleteModal(true);
							}}
							style={{ cursor: "pointer" }}
						>
							<RiDeleteBinLine color="#EF4444" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Share"}>
						<div
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setShowDeleteModal(true);
							}}
							style={{ cursor: "pointer" }}
						>
							<BsShareFill color="#7D7D7D" size={20} />
						</div>
					</Tooltip>
				</Wrapper>
			),
		},
	];
	const listing = () => {
		if (!props.searchQuery) {
			return props.blogList;
		} else {
			if (props.filterBy) {
				return props.blogList.filter((item) =>
					item[props.filterBy]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			return props.blogList.filter((item) =>
				item.name.toLowerCase().includes(props.searchQuery.toLowerCase())
			);
		}
	};

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 25,
			}}
			spin
		/>
	);
	console.log("rowdata", props.blogList);

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
					// dataSource={props.blogList}
					dataSource={
						props.blogList
							? props.orderBy
								? listing().sort((a, b) =>
										a[props.orderBy].toString().localeCompare(b[props.orderBy])
								  )
								: listing()
							: []
					}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
