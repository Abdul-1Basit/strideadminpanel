import React from "react";
import { primaryColor } from "../../Constants";

import Styles from "./Styles";
const CustomButton = (props) => {
	const btnStyling = {
		...Styles.buttonStyle,
		backgroundColor: props.disabled ? "#e8c4ac" : primaryColor,
		maxWidth: props.large ? 390 : 100,
	};
	return (
		<input
			type={props.type ?? "button"}
			disabled={props.disabled ?? false}
			onClick={() => {
				props.onClick();
			}}
			value={props.title}
			// style={btnStyling}
			className="addBtnModal"
		/>
	);
};

export default CustomButton;
