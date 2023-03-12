import { BsFillInboxesFill } from "react-icons/bs";
import { MdPermContactCalendar } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
export default function Analytics(props) {
	const newOrders = [];
	// props.orderList.filter(
	// 	(item) => item.status.toString().toLowerCase() === "new"
	// );
	const scheduledOrders = [];
	// props.orderList.filter(
	// 	(item) => item.status === "Scheduled"
	// );
	const deliveredOrders = [];
	// props.orderList.filter(
	// 	(item) => item.deliveryStatus.toString().toLowerCase() === "delivered"
	// );
	const cancelledOrders = [];
	// props.orderList.filter(
	// 	(item) => item.deliveryStatus.toString().toLowerCase() === "cancelled"
	// );

	return (
		<div className="analyticsDiv">
			<div className="analyticsCard">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Gilroy-Bold",
						}}
					>
						{newOrders.length ?? 0}
					</span>
					<span
						style={{
							fontSize: 14,
							color: "gray",
						}}
					>
						<span
							style={{
								color: "green",
							}}
						>
							(+53%)
						</span>{" "}
						New Orders
					</span>
					<span
						style={{
							fontSize: 13,
							color: "gray",
						}}
					>
						since last week
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 6,
						padding: 7,
						backgroundColor: "#fdf4e2",
					}}
				>
					<BsFillInboxesFill color="#ebb54d" size={18} />
				</div>
			</div>
			<div className="analyticsCard">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Gilroy-Bold",
						}}
					>
						{scheduledOrders.length ?? 0}
					</span>
					<span
						style={{
							fontSize: 14,
							color: "gray",
						}}
					>
						<span
							style={{
								color: "green",
							}}
						>
							(0%)
						</span>{" "}
						Scheduled Deliveries
					</span>
					<span
						style={{
							fontSize: 13,
							color: "gray",
						}}
					>
						since last week
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 6,
						padding: 7,
						backgroundColor: "#dcf0fc",
					}}
				>
					<MdPermContactCalendar color="#3abbf4" size={19} />
				</div>
			</div>
			<div className="analyticsCard">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Gilroy-Bold",
						}}
					>
						{deliveredOrders.length ?? 0}
					</span>
					<span
						style={{
							fontSize: 14,
							color: "gray",
						}}
					>
						<span
							style={{
								color: "red",
							}}
						>
							(-35%)
						</span>{" "}
						Orders Delivered
					</span>
					<span
						style={{
							fontSize: 13,
							color: "gray",
						}}
					>
						since last week
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 6,
						padding: 7,
						backgroundColor: "#e5f5eb",
					}}
				>
					<AiOutlineFileDone color="#3c8840" />
				</div>
			</div>
			<div className="analyticsCard">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Gilroy-Bold",
						}}
					>
						{cancelledOrders.length ?? 0}
					</span>
					<span
						style={{
							fontSize: 14,
							color: "gray",
						}}
					>
						<span
							style={{
								color: "green",
							}}
						>
							(0%)
						</span>{" "}
						Cancelled Orders
					</span>
					<span
						style={{
							fontSize: 13,
							color: "gray",
						}}
					>
						since last week
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 6,
						padding: 7,
						backgroundColor: "#f9e1dc",
					}}
				>
					<FcCancel color="#dc3a0a" />
				</div>
			</div>
		</div>
	);
}
