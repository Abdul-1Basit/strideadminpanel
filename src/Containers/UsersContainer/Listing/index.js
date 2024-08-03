import React from "react";
import Typography from "../../../Components/Typography";
import { Tooltip, Table, Spin } from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined } from "@ant-design/icons";

const UserListing = (props) => {
	// dob,
	// 	emailAddress,
	// 	firstName,
	// 	lastName,
	// 	gender,
	// 	password,
	// 	phoneNumber,
	// 	address,
	// 	image,
	// 	role = "user",
	// 	joinedOn = moment(new Date()).format("MM-DD-YYYY"),
	const columns = [
		{
			title: "USER ID",
			// dataIndex: "avatar",
			// fixed: "left",
			width: 70,
			render: (rowData) => (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						color={"#334155"}
						title={
							rowData.id.toString().length > 5
								? rowData.id.toString().substr(0, 5)
								: rowData.id.toString()
						}
					/>
				</div>
			),
		},
		{
			title: "NAME",
			// dataIndex: "emailAddress",
			// fixed: "left",
			width: 120,
			render: (rowData) => (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-start",
						// justifyContent: "space-between",
						width: 120,
					}}
				>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						color={"#334155"}
						title={rowData.firstName}
					/>
					&nbsp;
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						color={"#334155"}
						title={rowData.lastName}
					/>
				</div>
			),
		},
		{
			title: "EMAIL",
			width: 150,
			render: (rowData) => (
				<div style={{ width: 150 }}>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						color={"#334155"}
						title={rowData.email}
					/>
				</div>
			),
		},
		{
			title: "DATE OF BIRTH",
			// dataIndex: "dob",
			width: 75,
			render: (rowData) => (
				<div style={{ width: 75 }}>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						color={"#334155"}
						title={moment(rowData.dob).format("MM-DD-YYYY")}
					/>
				</div>
			),
		},
		{
			title: "ADDRESS",
			// dataIndex: "isActive",
			width: 80,
			render: (item) => (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: 72,
					}}
				>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						title={item.city + ", " + item.country}
					/>
				</div>
			),
		},
		{
			title: "JOINED ON",
			width: 85,
			render: (item) => (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: 80,
					}}
				>
					<Typography
						alignment="left"
						fontFamily="Gilroy-Medium"
						type="label"
						title={item.joinedOn}
					/>
				</div>
			),
		},
		{
			title: "ACTIONS",
			// fixed: "right",
			width: 30,
			render: (rowData) => (
				<Wrapper type="rowEvenAlign">
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							// className={"centerAligner actions"}
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setDeleteModal(true);
							}}
							style={{
								width: 30,
							}}
						>
							<MdDelete color="#D30E0E" size={20} />
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
	return (
		<div style={{ width: "100%" }}>
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
					dataSource={props.usersListing ?? []}
					// scroll={{
					// 	x: 1300,
					// }}
				/>
			)}
		</div>
	);
};

export default UserListing;
