import React from "react";
import Wrapper from "../../Components/Wrapper";
import Typography from "../../Components/Typography";
import { primaryColor } from "../../Constants";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	deleteBannerImage,
	deleteCarouselImage,
	getAllBannerImages,
	getAllCarouselImages,
} from "../../Helpers/firebase";
import ImageUpload from "./ImageUpload";
const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 25,
		}}
		spin
	/>
);

export default function ImageMangementContainer(props) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(-1);
	const [carousel, setCarousel] = React.useState(false);

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [campaignListing, setCampaignListing] = React.useState([]);
	const [bannerListing, setBannerListing] = React.useState([]);
	const deleteItem = async (item) => {
		setIsDeleting(item.id);
		await deleteCarouselImage(item);
		setIsDeleting(-1);
	};
	const deleteBannerItem = async (item) => {
		setIsDeleting(item.id);
		await deleteBannerImage(item);
		setIsDeleting(-1);
	};
	React.useEffect(() => {
		getCarousell();
		getBanners();
	}, [isModalOpen, isDeleting]);
	const getCarousell = async () => {
		setIsLoading(true);
		let temp = await getAllCarouselImages();
		setCampaignListing(temp);
		setIsLoading(false);
	};
	const getBanners = async () => {
		setIsLoading(true);
		let temp = await getAllBannerImages();
		setBannerListing(temp);
		setIsLoading(false);
	};
	const triggerModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<div className="container">
			<div className="containerBody">
				<Wrapper type="rowStart" backColor="transparent">
					<Typography
						alignment="left"
						title="Images"
						fontFamily="Gilroy-Bold"
						color="#0F172A"
						type="Heading"
					/>
				</Wrapper>
			</div>{" "}
			<ImageUpload {...{ isModalOpen, setIsModalOpen, carousel }} />
			<div className="containerListing">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingTop: 10,
					}}
				>
					<Typography
						alignment="left"
						title="Homepage Carousel Images"
						fontFamily="Gilroy-Bold"
						color="#0F172A"
						type="Heading"
					/>
					<button
						style={{
							backgroundColor: isLoading ? "gray" : primaryColor,
							paddingTop: 10,
							paddingBottom: 10,
							paddingLeft: 20,
							paddingRight: 20,
							color: "#fff",
							borderRadius: 12,
							cursor: "pointer",
						}}
						//disabled={isLoading}
						onClick={() => {
							setCarousel(true);
							setIsModalOpen(true);
						}}
					>
						Add <PlusOutlined />
					</button>
				</div>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							paddingTop: 100,
						}}
					>
						<span style={{ color: primaryColor, fontSize: 20 }}>
							Loading Carousel Images.....
						</span>
						<Spin indicator={antIcon} />
					</div>
				) : (
					<CampaignImageListing
						{...{ campaignListing, deleteItem, isDeleting }}
					/>
				)}
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: 50,
					}}
				>
					<Typography
						alignment="left"
						title="Homepage Banner Images"
						fontFamily="Gilroy-Bold"
						color="#0F172A"
						type="Heading"
					/>
					<button
						style={{
							backgroundColor: isLoading ? "gray" : primaryColor,
							paddingTop: 10,
							paddingBottom: 10,
							paddingLeft: 20,
							paddingRight: 20,
							color: "#fff",
							borderRadius: 12,
							cursor: "pointer",
						}}
						disabled={isLoading}
						onClick={() => {
							setCarousel(false);
							setIsModalOpen(true);
						}}
					>
						Add <PlusOutlined />
					</button>
				</div>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							paddingTop: 100,
						}}
					>
						<span style={{ color: primaryColor, fontSize: 20 }}>
							Loading Banner Images.....
						</span>
						<Spin indicator={antIcon} />
					</div>
				) : (
					<BannerlListing
						{...{ bannerListing, deleteBannerItem, isDeleting }}
					/>
				)}
			</div>
		</div>
	);
}
const CampaignImageListing = ({ campaignListing, deleteItem, isDeleting }) => {
	return (
		<Row style={{ paddingTop: 10 }}>
			{campaignListing.map((item, index) => {
				return isDeleting === item.id ? (
					<Spin indicator={antIcon} />
				) : (
					<Col
						xs={24}
						sm={24}
						md={10}
						lg={8}
						xl={8}
						xxl={6}
						key={index}
						className="rowAligner radius8"
						style={{
							marginBottom: 10,
						}}
					>
						<img
							src={item.image}
							alt={"img" + index}
							style={{
								width: "100%",
								maxWidth: 320,
								height: "100%",
								objectFit: "contain",
								borderRadius: 8,
								boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							}}
						/>
						<div
							className="centerAligner"
							style={{
								width: 30,
								height: 30,
								borderRadius: "50%",
								backgroundColor: "#fff",
								marginLeft: -35,
								marginTop: 10,
								boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
								cursor: "pointer",
							}}
							onClick={() => deleteItem(item)}
						>
							<CloseOutlined style={{ color: primaryColor }} />
						</div>
					</Col>
				);
			})}
		</Row>
	);
};

const BannerlListing = ({ bannerListing, deleteBannerItem, isDeleting }) => {
	return (
		<Row style={{ paddingTop: 10 }}>
			{bannerListing.map((item, index) => {
				return isDeleting === item.id ? (
					<Spin indicator={antIcon} />
				) : (
					<Col
						xs={24}
						sm={24}
						md={10}
						lg={8}
						xl={8}
						xxl={6}
						key={index}
						className="rowAligner radius8"
						style={{
							marginBottom: 10,
						}}
					>
						<img
							src={item.image}
							alt={"img" + index}
							style={{
								width: "100%",
								maxWidth: 320,
								height: "100%",
								objectFit: "contain",
								borderRadius: 8,
								boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							}}
						/>
						<div
							className="centerAligner"
							style={{
								width: 30,
								height: 30,
								borderRadius: "50%",
								backgroundColor: "#fff",
								marginLeft: -35,
								marginTop: 10,
								boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
								cursor: "pointer",
							}}
							onClick={() => deleteBannerItem(item)}
						>
							<CloseOutlined style={{ color: primaryColor }} />
						</div>
					</Col>
				);
			})}
		</Row>
	);
};
