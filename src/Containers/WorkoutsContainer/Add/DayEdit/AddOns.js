const WeightSelection = ({ activeParentItem, index, setterFunc, type }) => (
	<select
		name="weightselect"
		id="weightselect"
		defaultValue={activeParentItem[index].weightunit ?? "lbs"}
		onChange={(e) => {
			let prevValues = [...activeParentItem];
			prevValues[index].weightunit = e.target.value;
			setterFunc(type, prevValues);
		}}
		className="addonField"
	>
		<option value="lbs">lbs</option>
		<option value="kg">kg</option>
	</select>
);
const TimeSelection = ({ activeParentItem, index, setterFunc, type }) => (
	<select
		name="weightselect"
		id="weightselect"
		defaultValue={activeParentItem[index].weightunit ?? "Sec"}
		className="addonField"
		onChange={(e) => {
			// item = e.target.value;
			let prevValues = [...activeParentItem];
			prevValues[index].weightunit = e.target.value;
			setterFunc(type, prevValues);
		}}
	>
		<option value="Min">Min</option>
		<option value="Sec">Sec</option>
	</select>
);

export { TimeSelection, WeightSelection };
