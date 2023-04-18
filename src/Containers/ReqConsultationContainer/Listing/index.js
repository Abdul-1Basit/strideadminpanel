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
			title: "REQ ID",
			render: (rowData) => {
				return (
					<div style={{ width: 160 }}>
						<span className="label">{rowData.id}</span>
					</div>
				);
			},
		},
		{
			title: "NAME",
			render: (rowData) => {
				return (
					<div style={{ width: 140 }}>
						<span className="label">{rowData.name}</span>
					</div>
				);
			},
		},
		{
			title: "EMAIL",
			render: (rowData) => {
				return (
					<div
						style={{
							width: 140,
						}}
					>
						<span className="label">{rowData.email}</span>
					</div>
				);
			},
		},
		{
			title: "DESCRIPTION",
			render: (rowData) => {
				return (
					<div
						style={
							{
								// width: 140,
							}
						}
					>
						<span className="label">{rowData.description}</span>
					</div>
				);
			},
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
					columns={columns}
					dataSource={[
						{
							id: "AX-125",
							name: "Bernard Walsh",
							email: "Carmine5@yahoo.com",
							description:
								"Assumenda enim dolor et ratione. Sit voluptatem accusantium num Assumenda enim dolor et ratione. Sit voluptatem accusantium num",
						},
					]}
				/>
			)}
		</div>
	);
};

export default PrizeListing;
