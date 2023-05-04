import { Select } from "antd";
const { Option } = Select;
const weightSelection = (item) => (
	<Select defaultValue={"lbs"}>
		<Option value="lbs">lbs</Option>
		<Option value="kg">kg</Option>
	</Select>
);
const WeightSelection = ({ activeParentItem, index, setterFunc }) => (
	<select
		name="weightselect"
		id="weightselect"
		defaultValue={activeParentItem[index].weightunit ?? "lbs"}
		onChange={(e) => {
			let prevValues = [...activeParentItem];
			prevValues[index].weightunit = e.target.value;
			setterFunc(prevValues);
		}}
		style={{
			backgroundColor: "#fff",
			border: "none",
			// padding: 5,
			outline: "none",
			borderRadius: 6,
			height: 40,
			width: 45,
		}}
	>
		<option value="lbs">lbs</option>
		<option value="kg">kg</option>
	</select>
);
const TimeSelection = ({ activeParentItem, index, setterFunc }) => (
	<select
		name="weightselect"
		id="weightselect"
		defaultValue={activeParentItem[index].weightunit ?? "Sec"}
		style={{
			backgroundColor: "#fff",
			border: "none",
			// padding: 5,
			outline: "none",
			borderRadius: 6,
			height: 40,
			width: 45,
		}}
		onChange={(e) => {
			// item = e.target.value;
			let prevValues = [...activeParentItem];
			prevValues[index].weightunit = e.target.value;
			setterFunc(prevValues);
		}}
	>
		<option value="Min">Min</option>
		<option value="Sec">Sec</option>
	</select>
);

export { TimeSelection, WeightSelection };
