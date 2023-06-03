import React from "react";
// import SpinnerComponent from "../../../../Components/SpinnerComponent";
import "../index.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Input, notification } from "antd";
// import { primaryColor } from "../../../../Constants";
// import { RiDeleteBackFill } from "react-icons/ri";
// import { GrAdd } from "react-icons/gr";
// import Select from "react-select";
// import { RxCross2, RxCross1 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { BsCheckLg } from "react-icons/bs";
// import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { getAllExercises } from "../../../../Helpers/firebase";
import ExerciseItem from "./ExerciseItem";
const { TextArea } = Input;
export default function DayEdit(props) {
	const [visible, setVisible] = React.useState(false);
	const [notes, setNotes] = React.useState(
		props.days[props.activeItemIndex].notes ?? ""
	);
	const [activeType, setActiveType] = React.useState("");
	const [refreshMe, setRefereshMe] = React.useState(false);
	const [warmupCounter, setWarmupCounter] = React.useState(1);
	const [warmupOpen, setWarmupOpen] = React.useState(true);
	const [warmup, setWarmup] = React.useState(
		props.days[props.activeItemIndex].warmup ?? []
	);
	const [workoutCounter, setWorkoutCounter] = React.useState(1);
	const [workoutOpen, setWorkoutOpen] = React.useState(true);
	const [workout, setWorkout] = React.useState(
		props.days[props.activeItemIndex].workout ?? []
	);
	const [api, contextHolder] = notification.useNotification();
	const [listOfCategories, setListOfCategories] = React.useState([]);
	const [cooldownCounter, setCoolDownCounter] = React.useState(1);
	const [cooldownOpen, setCoolDownOpen] = React.useState(true);
	const [cooldown, setCoolDown] = React.useState(
		props.days[props.activeItemIndex].cooldown ?? []
	);
	const deleteMeFromWarmup = (index) => {
		let newArr = [...warmup];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setWarmup(newArr);
		setRefereshMe(true);
	};

	const deleteMeFromWorkout = (index) => {
		let newArr = [...workout];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setWorkout(newArr);
		setRefereshMe(true);
	};

	const deleteMeFromCoolDown = (index) => {
		let newArr = [...cooldown];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setCoolDown(newArr);
		setRefereshMe(true);
	};
	const setToAllWarmup = (index) => {
		let item = warmup[index]; //.find((itm, idex) => idex === index);
		let newArr = [...warmup];
		newArr.forEach((innerItem, innnerIndex) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.weightunit = item.weightunit;
			innerItem.timeUnit = item.timeUnit;
			innerItem.restUnit = item.restUnit;
			innerItem.time = item.time;
			innerItem.rest = item.rest;
		});
		// console.log("loop executing");
		console.log("previous array", warmup);
		console.log("new array", newArr);
		setWarmup(newArr);
		setRefereshMe(true);
	};
	const setToAllWorkout = (index) => {
		let item = workout[index]; //.find((itm, idex) => idex === index);
		let newArr = [...workout];
		newArr.forEach((innerItem) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.weightunit = item.weightunit;
			innerItem.timeUnit = item.timeUnit;
			innerItem.restUnit = item.restUnit;
			innerItem.time = item.time;
			innerItem.rest = item.rest;
			console.log("current active val", item);
		});
		console.log("executingsetto All workout function", newArr);

		setWorkout(newArr);
	};
	const setToAllCoolDown = (index) => {
		let item = cooldown[index]; //.find((itm, idex) => idex === index);
		let newArr = [...cooldown];
		newArr.forEach((innerItem, innnerIndex) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.weightunit = item.weightunit;
			innerItem.timeUnit = item.timeUnit;
			innerItem.restUnit = item.restUnit;

			innerItem.time = item.time;
			innerItem.rest = item.rest;
		});
		// console.log("loop executing");

		setCoolDown(newArr);
	};
	const addFollowing = (itemList) => {
		if (activeType === "warmup") {
			let newWarmupArray = [...warmup];
			itemList.forEach((item, i) => {
				newWarmupArray.push({
					id: newWarmupArray.length,
					name: itemList.toString(),
					reps: 0,
					sets: 0,
					weight: 0,
					time: 0,
					rest: 0,
				});
			});
			setWarmup(newWarmupArray);
			setWarmupOpen(true);
		} else if (activeType === "workout") {
			let newWarmupArray = [...workout];
			itemList.forEach((item, i) => {
				newWarmupArray.push({
					id: newWarmupArray.length,
					name: itemList.toString(),
					reps: 0,
					sets: 0,
					weight: 0,
					time: 0,
					rest: 0,
				});
			});
			setWorkout(newWarmupArray);
			setWorkoutOpen(true);
		} else if (activeType === "cooldown") {
			let newWarmupArray = [...cooldown];
			itemList.forEach((item, i) => {
				newWarmupArray.push({
					id: newWarmupArray.length,
					name: itemList.toString(),
					reps: 0,
					sets: 0,
					weight: 0,
					time: 0,
					rest: 0,
				});
			});
			setCoolDown(newWarmupArray);
			setCoolDownOpen(true);
		}
		setActiveType("");
		setVisible(false);
	};
	console.log("cooldown", cooldown);
	React.useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	React.useEffect(() => {
		if (refreshMe) {
			setRefereshMe(false);
		}
		if (listOfCategories.length === 0) fetchExercises();
	}, [refreshMe]);
	const fetchExercises = async () => {
		const listOfExes = await getAllExercises();
		let categoryList = [];
		let listOfExercisez = [];
		let prevCatogries = [];

		// listOfExes.forEach((item) => {
		// 	if (categoryList.findIndex((lIndex) => lIndex === item.category) < 0) {
		// 		categoryList.push(item.category);
		// 	}
		// });
		// categoryList.forEach((itemOne) => {
		listOfExes.forEach((itemTwo) => {
			// if (itemOne === itemTwo.category) {
			listOfExercisez.push(itemTwo.name);
			// }
		});
		// prevCatogries.push({
		// 	categoryName: itemOne,
		// 	listOfExercises: listOfExercisez,
		// });
		// listOfExercisez = [];
		// });
		setListOfCategories(listOfExercisez);
		console.log("list ofexercises", listOfExercisez);
	};

	return (
		<div className="containerForAdd">
			{contextHolder}
			{/* <AddModal
				visible={visible}
				setVisible={setVisible}
				addFollowing={addFollowing}
			/> */}
			<div className="rowing">
				<div />
				{/* {addingUser ? (
					<SpinnerComponent size={"small"} />
				) : ( */}
				<div className="rowing">
					<span
						className="draftBtn"
						style={{ backgroundColor: "#222222" }}
						onClick={() => {
							notification.info({
								message: `Your changes haven't been made`,
								description: ``,
								placement: "topRight",
								duration: 2,
								onClose: function () {
									props.setActiveScreen(0);
								},
							});
						}}
					>
						Cancel
					</span>
					<span
						className="savebtn"
						onClick={() => {
							// console.log("warm values", warmup);
							// console.log("workouts", workout);
							// console.log("cooldonw", cooldown);
							if (props.disabled) {
								props.showWarning();
								return;
							}
							let oldDaya = [...props.days];
							oldDaya[props.activeItemIndex].warmup = warmup;
							oldDaya[props.activeItemIndex].workout = workout;
							oldDaya[props.activeItemIndex].cooldown = cooldown;
							oldDaya[props.activeItemIndex].notes = notes;
							props.setDays(oldDaya);
							notification.success({
								message: `Your changes have been saved`,
								description: ``,
								placement: "topRight",
								duration: 2,
								onClose: function () {
									props.setActiveScreen(0);
								},
							});
						}}
					>
						Save
					</span>
				</div>
			</div>
			<div className="cardAdditionBlog">
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Warmup</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										style={{ width: 50 }}
										value={warmupCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setWarmupCounter(parseInt(e.target.value));
											if (!e.target.value) {
												setWarmupCounter(0);
											}
										}}
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setWarmupCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (warmupCounter !== 0)
													setWarmupCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...warmup];
											for (let i = 0; i < warmupCounter; i++) {
												tempDays.push({
													id: warmup.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setWarmup(tempDays);
											setWarmupOpen(true);
											notification.success({
												message:
													warmupCounter > 1
														? `You have added ${warmupCounter} exercises to the warmup`
														: `You have added ${warmupCounter} exercise to the warmup`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setWarmupCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="barVertical" />
					{warmupOpen && (
						<>
							<div>
								{warmup.length > 0 &&
									warmup.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromWarmup}
											setToAll={setToAllWarmup}
											setterFunc={setWarmup}
											activeParentItem={warmup}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...warmup];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: warmup.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
										// console.log("loop executing");
									}
									setWarmup(tempDays);
								}}
							>
								<IoMdAdd
									color={"#F94F00"}
									size={40}
									style={{ color: "#F94F00", fontSize: 40 }}
								/>
							</span>
						</>
					)}
				</div>
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Workout</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										// onChange={setWorkoutCounter}
										style={{ width: 50 }}
										value={workoutCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setWorkoutCounter(parseInt(e.target.value));
											// console.log("worokout counter value", e.target.value);
										}}
										// className=""
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setWorkoutCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (workoutCounter !== 0)
													setWorkoutCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...workout];
											for (let i = 0; i < workoutCounter; i++) {
												tempDays.push({
													id: workout.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setWorkout(tempDays);
											setWorkoutOpen(true);
											notification.success({
												message:
													workoutCounter > 1
														? `You have added ${workoutCounter} exercises to the workout`
														: `You have added ${workoutCounter} exercise to the workout`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setWorkoutCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="barVertical" />
					{workoutOpen && (
						<>
							<div>
								{workout.length > 0 &&
									workout.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromWorkout}
											setToAll={setToAllWorkout}
											setterFunc={setWorkout}
											activeParentItem={workout}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...workout];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: workout.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
										// console.log("loop executing");
									}
									setWorkout(tempDays);
								}}
							>
								<IoMdAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Cooldown</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel inputText"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										// onChange={setWorkoutCounter}
										style={{ width: 50 }}
										value={cooldownCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setCoolDownCounter(parseInt(e.target.value));
											// console.log("worokout counter value", e.target.value);
										}}
										// className=""
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setCoolDownCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (cooldownCounter !== 0)
													setCoolDownCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...cooldown];
											for (let i = 0; i < cooldownCounter; i++) {
												tempDays.push({
													id: cooldown.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setCoolDownOpen(true);
											setCoolDown(tempDays);
											notification.success({
												message:
													cooldownCounter > 1
														? `You have added ${cooldownCounter} exercises to the cooldown`
														: `You have added ${cooldownCounter} exercise to the cooldown`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setCoolDownCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="barVertical" />
					{cooldownOpen && (
						<>
							<div>
								{cooldown.length > 0 &&
									cooldown.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromCoolDown}
											setToAll={setToAllCoolDown}
											setterFunc={setCoolDown}
											activeParentItem={cooldown}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...cooldown];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: cooldown.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
										// console.log("loop executing");
									}
									setCoolDown(tempDays);
								}}
							>
								<IoMdAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
				<div>
					<span className="addBlogInputLabel">NOTES</span>
					<div style={{ marginTop: 10 }}>
						<TextArea
							// rows={4}
							autoSize={{
								minRows: 15,
								maxRows: 15,
							}}
							placeholder="Enter notes..."
							maxLength={500}
							showCount
							className="addBlogInput overViewDescription"
							name="overviewDescription"
							onChange={(e) => setNotes(e.target.value)}
							// onBlur={handleBlur}
							value={notes}
							style={{
								width: "100%",
								display: "flex",
								height: 400,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// const AddModal = (props) => {
// 	const [listOfExercise, setListOfExercise] = React.useState([]);
// 	const [searchQuery, setSearchQuery] = React.useState("");
// 	const [listOfCategories, setListOfCategories] = React.useState([]);
// 	React.useEffect(() => {
// 		fetchExercises();
// 	}, []);
// 	const fetchExercises = async () => {
// 		const listOfExes = await getAllExercises();
// 		let categoryList = [];
// 		let listOfExercisez = [];
// 		let prevCatogries = [];

// 		listOfExes.forEach((item) => {
// 			if (categoryList.findIndex((lIndex) => lIndex === item.category) < 0) {
// 				categoryList.push(item.category);
// 			}
// 		});
// 		categoryList.forEach((itemOne) => {
// 			listOfExes.forEach((itemTwo) => {
// 				if (itemOne === itemTwo.category) {
// 					listOfExercisez.push(itemTwo.name);
// 				}
// 			});
// 			prevCatogries.push({
// 				categoryName: itemOne,
// 				listOfExercises: listOfExercisez,
// 			});
// 			listOfExercisez = [];
// 		});
// 		setListOfCategories(prevCatogries);
// 	};
// 	const deleteMe = (index) => {
// 		let newList = [...listOfExercise];
// 		newList = listOfExercise.filter((itm, ind) => ind !== index);
// 		setListOfExercise(newList);
// 	};

// 	const checkForListOfExercise = (item) => {
// 		let newList = [...listOfExercise];
// 		// let checkIndex=
// 		if (newList.findIndex((innrItem) => innrItem === item) < 0) {
// 			newList.push(item);
// 		} else {
// 			newList = newList.filter((innrItem) => innrItem !== item);
// 		}
// 		setListOfExercise(newList);
// 	};

// 	return (
// 		<Modal
// 			open={props.visible}
// 			// className="addProgramsModal"
// 			style={{
// 				position: "absolute",
// 				right: 0,
// 				top: 0,
// 				// padding: 40,
// 				borderRadius: 0,
// 			}}
// 			closable={false}
// 			footer={null}
// 			title={null}
// 		>
// 			<div //className="addProgramsModal"
// 				style={{ padding: 40, minHeight: "100vh", height: "100%" }}
// 			>
// 				<div className="flexEnd" style={{ paddingBottom: 32 }}>
// 					<span
// 						className="modlCloseBtn"
// 						onClick={() => props.setVisible(false)}
// 					>
// 						<RxCross2 size={30} style={{ alignSelf: "center" }} />
// 					</span>
// 				</div>
// 				<span className="addMdlHeading">Select Exercises for Warm up</span>
// 				<div className="modlBody">
// 					<div style={{ width: 247 }}>
// 						{listOfExercise.map((item, index) => {
// 							return (
// 								<div className="tagCustom" key={index}>
// 									<span>{item}</span>
// 									<RxCross1 size={14} onClick={() => deleteMe(index)} />
// 								</div>
// 							);
// 						})}
// 					</div>
// 					<div className="inputSearchCustom">
// 						<input
// 							className="inputField"
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 							placeholder="Search"
// 						/>
// 						<BiSearch color="#D6D6D6" size={25} />
// 					</div>
// 					{listOfCategories.map((itm, ind) => (
// 						<CustomCollapsible
// 							item={itm}
// 							key={ind}
// 							checkForListOfExercise={checkForListOfExercise}
// 							listOfExercise={listOfExercise}
// 						/>
// 					))}
// 					<input
// 						className="customAddBtn"
// 						value="Add"
// 						onClick={() => {
// 							if (listOfExercise.length !== 0) {
// 								props.addFollowing(listOfExercise);
// 							} else {
// 								alert("Please select one exercise atleast");
// 							}
// 						}}
// 					/>
// 				</div>
// 			</div>
// 		</Modal>
// 	);
// };

// const CustomCollapsible = (props) => {
// 	const [open, setOpen] = React.useState(false);
// 	return (
// 		<div>
// 			<span className="checkBoxHeading" onClick={() => setOpen(!open)}>
// 				{open ? (
// 					<SlArrowUp color="#F94F00" style={{ marginRight: 10 }} />
// 				) : (
// 					<SlArrowDown color="#F94F00" style={{ marginRight: 10 }} />
// 				)}
// 				{props.item.categoryName}
// 			</span>
// 			{open && (
// 				<div>
// 					{props.item.listOfExercises.map((innerItem, innerIndex) => {
// 						return (
// 							<span
// 								className="checkboxItem rowing"
// 								key={innerIndex}
// 								onClick={() => {
// 									props.checkForListOfExercise(innerItem);
// 								}}
// 							>
// 								{innerItem}
// 								{props.listOfExercise.findIndex((itm) => itm === innerItem) <
// 								0 ? (
// 									<div className="emptyCheckBox" />
// 								) : (
// 									<div className="checkBoxContainer">
// 										<BsCheckLg size={14} color="#fff" />
// 									</div>
// 								)}
// 							</span>
// 						);
// 					})}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const SearchInput = (props) => {
// 	let oldData = ["Alpha", "Beta", "Gama", "Theta"];
// 	const [data, setData] = React.useState(oldData);
// 	const [value, setValue] = React.useState("");
// 	const handleSearch = (newValue) => {
// 		if (newValue) {
// 			fetch(newValue, setData);
// 		} else {
// 			setData([]);
// 		}
// 	};
// 	const handleChange = (newValue) => {
// 		setValue(newValue);
// 	};
// 	return (
// 		<Select
// 			showSearch
// 			value={value}
// 			placeholder={props.placeholder}
// 			style={props.style}
// 			defaultActiveFirstOption={false}
// 			showArrow={false}
// 			filterOption={false}
// 			onSearch={handleSearch}
// 			onChange={handleChange}
// 			notFoundContent={null}
// 			options={(data || []).map((d) => ({
// 				value: d,
// 				label: d,
// 			}))}
// 		/>
// 	);
// };
// const fetch = (value, callback) => {
// 	callback(
// 		["Alpha", "Beta", "Gama", "Theta"].filter((item) => item.includes(value))
// 	);
// 	// if (timeout) {
// 	//   clearTimeout(timeout);
// 	//   timeout = null;
// 	// }
// 	// currentValue = value;
// 	// const fake = () => {
// 	//   const str = qs.stringify({
// 	// 	code: 'utf-8',
// 	// 	q: value,
// 	//   });
// 	//   jsonp(`https://suggest.taobao.com/sug?${str}`)
// 	// 	.then((response) => response.json())
// 	// 	.then((d) => {
// 	// 	  if (currentValue === value) {
// 	// 		const { result } = d;
// 	// 		const data = result.map((item) => ({
// 	// 		  value: item[0],
// 	// 		  text: item[0],
// 	// 		}));
// 	// 		callback(data);
// 	// 	  }
// 	// 	});
// };
