import { BsFillCartDashFill } from "react-icons/bs";
import "./index.css";
export default function NewOrdersToday(props) {
	return (
		<div
			className="customCrdSpecial"
			style={{
				backgroundColor: "#F94F00",
				width: 330,
			}}
		>
			<div className="rowingStart">
				<div
					className="iconCircle"
					style={{ backgroundColor: "rgba(255, 255, 255, 0.16)" }}
				>
					<BsFillCartDashFill color="#fff" size={35} />
				</div>
				<div className="cardContent">
					<span className="counting" style={{ color: props.textColor }}>
						<span
							className="cardHeading"
							style={{
								fontWeight: 400,
								color: "#fff",
							}}
						>
							New Orders Today
						</span>
					</span>
					<span className={"cardSubHeading"} style={{ color: "#fff" }}>
						{props.number ?? 52}
					</span>
				</div>
			</div>
			<span className="descriptionForCard">
				Hurry up and fulfill your order now to maintain your best customer
				service
			</span>
		</div>
	);
}
