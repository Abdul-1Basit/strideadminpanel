import React from "react";
import Wrapper from "../../Components/Wrapper";
import Typography from "../../Components/Typography";
import { FiEdit } from "react-icons/fi";
import { Tooltip, Modal, Input } from "antd";
import { primaryColor } from "../../Constants";
import CustomButton from "../../Components/CustomButton";
export default function WinnersContainer(props) {
	const [editModal, setEditModal] = React.useState(false);
	const [activeUser, setActiveUser] = React.useState(null);
	const [winnersList, setWinnersList] = React.useState([
		{
			id: "123213213",
			imageUrl: "/winner.jpg",
			userName: "Mac Ovens",
			announcedOn: "3 November,2022",
			videos: [
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			],
		},
	]);
	return (
		<div style={{ paddingLeft: 30, paddingRight: 30 }}>
			<Wrapper
				type="rowSpaced"
				marginTop={32}
				marginBottom={24}
				width={"100%"}
				backColor="transparent"
			>
				<Wrapper type="rowStart" backColor="transparent">
					<Typography
						alignment="left"
						title="Winners"
						fontFamily="Gilroy-Bold"
						color="#0F172A"
						type="Heading"
					/>
				</Wrapper>
			</Wrapper>
			<Modal
				visible={editModal}
				title=""
				onCancel={() => setEditModal(false)}
				closable={false}
				className="ModalStyle"
				footer={null}
				destroyOnClose
			>
				<EditM {...{ setEditModal, activeUser, winnersList, setWinnersList }} />
			</Modal>

			<div style={{ width: "100%", backgroundColor: "#fff", borderRadius: 8 }}>
				{winnersList.map((item, index) => {
					return (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "baseline",
								justifyContent: "space-between",
								height: "auto",
								width: "100%",
								paddingTop: 10,
								paddingBottom: 10,
								paddingLeft: 20,
								paddingRight: 20,
								borderRadius: 6,
								backgroundColor: "#fafafa",
							}}
							key={index}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									justifyContent: "space-between",
								}}
							>
								<div>
									<span
										style={{
											color: primaryColor,
											fontFamily: "Gilroy-Bold",
											fontSize: 13,
											letterSpacing: 0.25,
											marginLeft: 5,
										}}
									>
										Winner Name
									</span>
								</div>
								<div>
									<img
										style={{ height: 62, width: 32, objectFit: "contain" }}
										src={item.imageUrl}
										alt={"winnerimage" + index}
									/>
									<span
										style={{
											color: primaryColor,
											fontFamily: "Gilroy-Bold",
											fontSize: 17,
											letterSpacing: 0.25,
											marginLeft: 5,
										}}
									>
										{item.userName}
									</span>
								</div>
							</div>
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
										color: primaryColor,
										fontFamily: "Gilroy-Bold",
										fontSize: 13,
										letterSpacing: 0.25,
										marginLeft: 5,
										paddingBottom: 7,
									}}
								>
									Announced on
								</span>
								<span>{item.announcedOn}</span>
							</div>
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
										color: primaryColor,
										fontFamily: "Gilroy-Bold",
										fontSize: 13,
										letterSpacing: 0.25,
										marginLeft: 5,
										paddingBottom: 7,
									}}
								>
									Videos{" "}
								</span>

								{item.videos.length === 0 ? (
									<span
										style={{
											color: "#bababa",
											fontFamily: "Gilroy-Bold",
											fontSize: 17,
											// letterSpacing: 0.25,
											marginLeft: 5,
										}}
									>
										No videos available
									</span>
								) : (
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										{item.videos.map((innerVideo, innerItem) => {
											return (
												<video
													style={{
														width: "100%",
														maxWidth: 120,
														height: 100,
														marginRight: 5,
														objectFit: "cover",
													}}
													controls
												>
													<source src={innerVideo} type="video/mp4"></source>
												</video>
											);
										})}
									</div>
								)}
							</div>
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
										color: primaryColor,
										fontFamily: "Gilroy-Bold",
										fontSize: 13,
										letterSpacing: 0.25,
										marginLeft: 5,
										paddingBottom: 7,
									}}
								>
									Actions
								</span>
								<div>
									<Wrapper type="rowEvenAlign">
										<Tooltip placement="topLeft" title={"Edit"}>
											<div
												className={"centerAligner actions"}
												onClick={() => {
													setActiveUser(item);
													setEditModal(true);
												}}
											>
												<FiEdit color="#0F172A" />
											</div>
										</Tooltip>
									</Wrapper>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
const EditM = (props) => {
	const [videourlOne, setVideourlOne] = React.useState(
		props.activeUser.videos.length === 1 ? props.activeUser.videos[0] : ""
	);
	const [videourlTwo, setVideourlTwo] = React.useState(
		props.activeUser.videos.length === 2 ? props.activeUser.videos[1] : ""
	);
	const [videourlThree, setVideourlThree] = React.useState(
		props.activeUser.videos.length === 3 ? props.activeUser.videos[2] : ""
	);
	const update = () => {
		let temp = [...props.winnersList];
		let index = temp.findIndex((item) => item.id === props.activeUser.id);
		let vidsList = [];
		if (videourlOne) {
			vidsList.push(videourlOne);
		}
		if (videourlTwo) {
			vidsList.push(videourlTwo);
		}
		if (videourlThree) {
			vidsList.push(videourlThree);
		}
		temp[index].videos = vidsList;
		props.setWinnersList(temp);
		props.setEditModal(false);
	};
	return (
		<div style={{ height: "100%", minHeight: "100vh" }}>
			<Wrapper type="rowSpaced" marginTop={10} marginBottom={60} w={"100%"}>
				<Typography
					alignment="left"
					title="Edit winner"
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>
				<img
					src={"/Union.png"}
					alt="Close icon"
					onClick={() => props.setEditModal(false)}
					style={{ width: 20, height: 20, cursor: "pointer" }}
				/>
			</Wrapper>
			{/**Name Input */}
			<div className="fieldDiv">
				<Wrapper type="rowStart" marginBottom={8}>
					<Typography
						alignment="left"
						title="Winner Name"
						fontFamily="Gilroy-Medium"
						color="#0F172A"
						type="label"
					/>
					<Typography
						alignment="left"
						title="*"
						fontFamily="Gilroy-Medium"
						color="#E1552F"
						type="label"
					/>
				</Wrapper>
				<input
					type={"text"}
					className="inputStyle"
					placeholder="Enter video Url"
					value={props.activeUser.userName}
				/>
			</div>
			<div className="fieldDiv">
				<Wrapper type="rowStart" marginBottom={8}>
					<Typography
						alignment="left"
						title="Video url #1"
						fontFamily="Gilroy-Medium"
						color="#0F172A"
						type="label"
					/>
					<Typography
						alignment="left"
						title="*"
						fontFamily="Gilroy-Medium"
						color="#E1552F"
						type="label"
					/>
				</Wrapper>
				<Input
					size="large"
					allowClear
					type={"text"}
					className="inputStyle"
					placeholder="Enter video Url"
					defaultValue={
						props.activeUser.videos.length === 1
							? props.activeUser.videos[0]
							: ""
					}
					onChange={(e) => {
						setVideourlOne(e.target.value);
					}}
				/>
			</div>
			<div className="fieldDiv">
				<Wrapper type="rowStart" marginBottom={8}>
					<Typography
						alignment="left"
						title="Video url #2"
						fontFamily="Gilroy-Medium"
						color="#0F172A"
						type="label"
					/>
					<Typography
						alignment="left"
						title="*"
						fontFamily="Gilroy-Medium"
						color="#E1552F"
						type="label"
					/>
				</Wrapper>
				<Input
					size="large"
					allowClear
					type={"text"}
					className="inputStyle"
					placeholder="Enter video Url"
					defaultValue={
						props.activeUser.videos.length === 2
							? props.activeUser.videos[1]
							: ""
					}
					onChange={(e) => {
						setVideourlTwo(e.target.value);
					}}
				/>
			</div>

			<div className="fieldDiv">
				<Wrapper type="rowStart" marginBottom={8}>
					<Typography
						alignment="left"
						title="Video url #3"
						fontFamily="Gilroy-Medium"
						color="#0F172A"
						type="label"
					/>
					<Typography
						alignment="left"
						title="*"
						fontFamily="Gilroy-Medium"
						color="#E1552F"
						type="label"
					/>
				</Wrapper>
				<Input
					size="large"
					allowClear
					type={"text"}
					className="inputStyle"
					placeholder="Enter video Url"
					defaultValue={
						props.activeUser.videos.length === 3
							? props.activeUser.videos[2]
							: ""
					}
					onChange={(e) => {
						setVideourlThree(e.target.value);
					}}
				/>
			</div>
			<div className="modalButtonStyle" style={{ paddingTop: 100 }}>
				<CustomButton
					large={true}
					onClick={() => {
						update();
					}}
					title="Update"
				/>
			</div>
		</div>
	);
};
