import React from "react";
import Typography from "../../../Components/Typography";
import { Tooltip, Table, Spin } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdVisibility, MdDelete } from "react-icons/md";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined } from "@ant-design/icons";

const UserListing = (props) => {
	const columns = [
		{
			title: "",
			width: 80,
			render: (rowData) => (
				<img
					src={rowData.image}
					style={{ width: 52, height: 52, borderRadius: 8 }}
				/>
			),
		},
		{
			title: "EMPLOYEE ID",
			// dataIndex: "id",
			// fixed: "left",
			// width: 70,

			render: (rowData) => (
				<div className="rowing">
					<Typography
						alignment="center"
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
			render: (rowData) => (
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<span className="label">{rowData.fullName}</span>{" "}
				</div>
			),
		},
		{
			title: "EMAIL",
			dataIndex: "email",
			render: (email) => (
				<div style={{ width: 120 }}>
					<span className="label">{email}</span>
				</div>
			),
		},
		{
			title: "ADDRESS",
			dataIndex: "address",
			render: (address) => (
				<Typography
					alignment="center"
					fontFamily="Gilroy-Medium"
					type="label"
					color={"#334155"}
					title={address}
				/>
			),
		},
		{
			title: "PHONE NUMBER",
			dataIndex: "phonenumber",
			render: (phonenumber) => (
				<Typography
					alignment="center"
					fontFamily="Gilroy-Medium"
					type="label"
					color={"#334155"}
					title={phonenumber}
				/>
			),
		},
		{
			title: "ACTIONS",
			render: (rowData) => (
				<Wrapper type="rowEvenAlign">
					<Tooltip placement="topLeft" title={"Clone"}>
						<div
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setCloneModal(true);
							}}
						>
							<MdVisibility color="#2DAB22" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topLeft" title={"Edit"}>
						<div
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setEditModal(true);
							}}
						>
							<FiEdit color="#6BA2E1" size={20} />
						</div>
					</Tooltip>
					<Tooltip placement="topRight" title={"Delete"}>
						<div
							onClick={() => {
								props.setActiveCategory(rowData);
								props.setDeleteModal(true);
							}}
						>
							<MdDelete color="#D30E0E" size={20} />
						</div>
					</Tooltip>
				</Wrapper>
			),
		},
	];

	const listing = () => {
		if (!props.searchQuery) {
			return props.employeeListing;
		} else {
			if (props.filterBy) {
				return props.employeeListing.filter((item) =>
					item[props.filterBy]
						.toLowerCase()
						.includes(props.searchQuery.toLowerCase())
				);
			}
			// return props.employeeListing.filter((item) =>
			// 	item.fullName.toLowerCase().includes(props.searchQuery.toLowerCase())
			// );
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
	return (
		<div
			style={{
				width: "100%",
			}}
		>
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
						props.employeeListing
							? props.orderBy === "id"
								? listing().sort(
										(a, b) => a.id.toLowerCase() < b.id.toLowerCase()
								  )
								: listing().sort(
										(a, b) =>
											a.fullName.toLowerCase() < b.fullName.toLowerCase()
								  )
							: []
					}
				/>
			)}
		</div>
	);
};

export default UserListing;
