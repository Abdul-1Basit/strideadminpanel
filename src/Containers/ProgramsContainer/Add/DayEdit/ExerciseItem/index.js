// import { Input, InputNumber } from "antd";
import { AiFillDelete } from "react-icons/ai";
import Select from "react-select";
import { WeightSelection, TimeSelection } from "./AddOns";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React from "react";
const ExerciseItem = ({
	listOfCategories,
	item,
	index,
	deleteMe,
	setToAll,
	setterFunc,
	activeParentItem,
}) => {
	const [activeIndex, setActiveIndex] = React.useState(-1);
	return (
		<div style={{ marginBottom: 0 }}>
			<div className="rowing">
				<div className="rowing">
					<span className="exerciseLabel">Exercise # {index + 1}</span>
					<span className="deleteWarmup" onClick={() => deleteMe(index)}>
						<AiFillDelete color="#D30E0E" size={22} />
					</span>

					{index === 0 && (
						<span
							className="seeAll"
							onClick={() => setToAll(index)}
							onMouseEnter={() => {
								setActiveIndex(0);
							}}
							onMouseLeave={() => {
								setActiveIndex(-1);
							}}
						>
							set to all
						</span>
					)}
				</div>
				<div />
			</div>
			<div className="rowStart marginVertical50">
				<div className="flexStart">
					<span className="customInputStyling">Exercise Name</span>
					<div style={{ marginTop: 10 }}>
						<Select
							defaultInputValue={activeParentItem[index].name}
							defaultValue={activeParentItem[index].name}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].name = e.value;
								setterFunc(prevValues);
							}}
							styles={{
								control: (baseStyles, state) => ({
									...baseStyles,
									// padding: "18px 24px",
									width: 314,
									height: 58,
									background: "#F4F4F4",
									borderRadius: 8,
									fontFamily: "Montserrat",
									fontStyle: "normal",
									fontWeight: "500",
									fontSize: 18,
									paddingLeft: 0,
									// lineHeight: 22,
								}),
							}}
							options={listOfCategories.map((itm) => {
								return {
									value: itm,
									label: itm,
								};
							})}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Reps</span>
					<div
						className="daysAdditionBtnDiv centerMe programDaysInput"
						style={{
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].reps}
							style={{ width: "100%", maxWidth: 90, paddingLeft: 0 }}
							placeholder={"0-0"}
							value={activeParentItem[index].reps}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].reps = e.target.value;
								setterFunc(prevValues);
							}}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Sets</span>
					<div
						className="daysAdditionBtnDiv centerMe programDaysInput"
						style={{
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].sets}
							style={{ width: "100%", maxWidth: 90, paddingLeft: 0 }}
							placeholder={"0-0"}
							value={activeParentItem[index].sets}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].sets = e.target.value;
								setterFunc(prevValues);
							}}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Weight</span>
					<div
						className="daysAdditionBtnDiv rowing programDaysInput"
						style={{
							width: 120,
							marginTop: 10,
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].weight}
							style={{ width: "100%", maxWidth: 55, paddingLeft: 0 }}
							placeholder={"0"}
							value={activeParentItem[index].weight}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].weight = e.target.value;
								setterFunc(prevValues);
							}}
						/>
						<WeightSelection
							activeParentItem={activeParentItem}
							index={index}
							setterFunc={setterFunc}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Time</span>
					<div style={{ marginTop: 0 }} className="colCenteral">
						<div
							className="daysAdditionBtnDiv rowing programDaysInput"
							style={{
								backgroundColor:
									activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
							}}
						>
							<input
								type={"text"}
								className="inputfont nmbrBtn"
								defaultValue={activeParentItem[index].time}
								style={{ width: "100%", maxWidth: 55, paddingLeft: 0 }}
								placeholder={"0"}
								value={activeParentItem[index].time}
								onChange={(e) => {
									let newVal = activeParentItem[index].time;
									if (parseInt(e.target.value) > -1 || !e.target.value)
										newVal = e.target.value;
									// if (!e.target.value) newVal = 0;
									let prevValues = [...activeParentItem];
									prevValues[index].time = newVal;
									setterFunc(prevValues);
								}}
							/>
							<TimeSelection
								activeParentItem={activeParentItem}
								index={index}
								setterFunc={setterFunc}
							/>
						</div>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Rest</span>
					<div
						className="daysAdditionBtnDiv rowing programDaysInput"
						style={{
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							// defaultValue={daysNumber}
							className="inputfont nmbrBtn"
							placeholder={0}
							defaultValue={activeParentItem[index].rest}
							// value={item.rest}
							style={{ width: "100%", maxWidth: 55, paddingLeft: 0 }}
							// placeholder={"0"}
							value={activeParentItem[index].rest}
							onChange={(e) => {
								let newVal = activeParentItem[index].rest;
								if (parseInt(e.target.value) > -1 || !e.target.value)
									newVal = e.target.value;

								let prevValues = [...activeParentItem];
								prevValues[index].rest = newVal;
								setterFunc(prevValues);
							}}
						/>
						<TimeSelection
							activeParentItem={activeParentItem}
							index={index}
							setterFunc={setterFunc}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ExerciseItem;
