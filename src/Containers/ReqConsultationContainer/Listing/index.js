import React from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
const PrizeListing = (props) => {
	const columns = [
		{
			title: "REQ ID",
			render: (rowData) => {
				return (
					<div
						style={{ width: 100 }}
						onClick={() => props.editThisProgram(rowData.id)}
					>
						<span className="label pNameUnderline">{rowData.id}</span>
					</div>
				);
			},
		},
		{
			title: "NAME",
			render: (rowData) => {
				return (
					<div style={{ width: 100 }}>
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
					<div>
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
				<Table columns={columns} dataSource={props.campaignListing} />
			)}
		</div>
	);
};

export default PrizeListing;
