import React from "react";
import "./index.css";
import { HiUserGroup } from "react-icons/hi";

export default function TotalUsers(props) {
	return (
		<div className="cardTotalUsers">
			<div className="topHeaderCard rowingStart">
				<div className="rowingStart">
					<div
						className="iconCircle"
						style={{ backgroundColor: "rgba(255, 255, 255, 0.16)" }}
					>
						<HiUserGroup color="#fff" size={35} />
					</div>
					<div className="cardContent">
						<span className="counting" style={{ color: "#fff" }}>
							<span
								className="cardHeading"
								style={{
									fontWeight: 400,
									color: "#fff",
								}}
							>
								Total Users
							</span>
						</span>
						<span className={"cardSubHeading"} style={{ color: "#fff" }}>
							54, 145
						</span>
					</div>
				</div>
			</div>
			<div className="cardTUContent colCenteral">
				<div className="margB16">
					<div className="rowing">
						<span className="cardTUdescription">Active Users</span>
						<span className="cardTUdescription">79%</span>
					</div>
					<div className="progressBar">
						<div
							style={{
								width: 230,
								height: 8,
								borderRadius: 21,
								backgroundColor: "#5DAA4A",
							}}
						/>
					</div>
				</div>
				<div className="margB16">
					<div className="rowing">
						<span className="cardTUdescription">Inactive Users</span>
						<span className="cardTUdescription">15%</span>
					</div>
					<div className="progressBar">
						<div
							style={{
								width: 230,
								height: 8,
								borderRadius: 21,
								backgroundColor: "#E75C5C",
							}}
						/>
					</div>
				</div>
				<div className="margB16">
					<div className="rowing">
						<span className="cardTUdescription">Guests</span>
						<span className="cardTUdescription">6%</span>
					</div>
					<div className="progressBar">
						<div
							style={{
								width: 230,
								height: 8,
								borderRadius: 21,
								backgroundColor: "#878787",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
