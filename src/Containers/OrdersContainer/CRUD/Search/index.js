import React from "react";
import Wrapper from "../../../../Components/Wrapper";
import { BsSearch } from "react-icons/bs";
import "./index.css";
export default function Search(props) {
	return (
		<div className="usersTableTopDiv">
			<Wrapper type="rowStart" backColor="transparent">
				<span className="tableTitle">List of Orders</span>
			</Wrapper>
			<div className="searchDropDownWithButton">
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
						marginLeft: 200,
						width: 194,
						border: "1px solid #E6E6E6",
						backgroundColor: "#F7F7F7",
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<input
						style={{
							background: "transparent",
							outline: "none",
							border: "none",
							paddingLeft: 10,
						}}
						placeholder="Search a order"
						className="searchNewInput"
						// filterBy,
						// orderBy,
						// searchQuery,
						value={props.searchQuery}
						onChange={(e) => props.setSearchQuery(e.target.value)}
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<div style={{ width: 45 }} />
				<select
					className="newSelect"
					onChange={(e) => props.setOrderBy(e.target.value)}
					value={props.orderBy}
				>
					<option value="" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="orderCreated">date</option>
				</select>
				<div style={{ width: 24 }} />
				<select
					className="newSelect"
					onChange={(e) => props.setFilterBy(e.target.value)}
					value={props.filterBy}
				>
					<option value="" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="orderCreated">Created</option>
					{/* <option value="phoneNumber">Phone #</option>
					<option value="address">Address</option> */}
				</select>
				<div style={{ width: 24 }} />
			</div>
		</div>
	);
}
