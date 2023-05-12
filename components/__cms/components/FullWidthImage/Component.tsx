import React from "react";
import Image from "next/image";

import { Box, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ImageSlider from "../../../cells/ImageSlider";
import Typography from "@mui/material/Typography";

//Import Scrollable Anchor
// import ScrollableAnchor from "react-scrollable-anchor";

interface FullWidthImageProps {
	heroBannerSlides: { imageUrl: string; caption: string }[];
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

const FullWidthImage = ({
	heroBannerSlides,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: FullWidthImageProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	const renderHeroBannerSlides = () =>
		heroBannerSlides.map((slide) => (
			<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
				<div
					style={{
						position: "relative",
						textAlign: "center",
						height: mobileWidth ? 380 : 620,
						overflow: "hidden",
						width: "100%",
					}}
				>
					<Image
						src={
							slide.imageUrl ||
							"https://wetu.com/ImageHandler/c833x500/Operators/7817/belinda-fewings-qrbv-cgomag-unsplash.jpg"
						}
						alt="hero-image"
						layout={"fill"}
						objectFit={"cover"}
						blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWw8AAd8BLiy87+IAAAAASUVORK5CYII=`}
						placeholder="blur"
						priority
					/>
				</div>
				<div>
					{slide.caption !== "" ? (
						<div style={{ textAlign: "center" }}>
							<Typography
								variant="body1"
								style={{
									lineHeight: 1.4,
									fontSize: "12px",
									padding: "0px 15px",
									marginBottom: 0,
									marginTop: 20,
									color:
										colorSettings === "Custom" ? sectionFontColor : "#494949",
								}}
							>
								{slide.caption}
							</Typography>
						</div>
					) : (
						<></>
					)}
				</div>
			</Box>
		));

	return heroBannerSlides ? (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : "section"}>
		<div
			style={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
			}}
		>
			<Container
				maxWidth={"lg"}
				style={{ padding: mobileWidth ? "3rem 1.5rem" : "3rem 2rem 4rem" }}
			>
				<ImageSlider slides={renderHeroBannerSlides()} />
			</Container>
		</div>
	) : (
		// </ScrollableAnchor>
		<></>
	);
};

export default FullWidthImage;
