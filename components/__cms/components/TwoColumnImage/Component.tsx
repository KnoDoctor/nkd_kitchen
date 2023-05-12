import React from "react";
import Image from "next/image";

import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { Grid, Container } from "@mui/material";

//Import Scrollable Anchor
// import ScrollableAnchor from "react-scrollable-anchor";

const StyledText = styled("p")(({ theme }) => ({
	fontFamily: theme.typography.body1.fontFamily,
	lineHeight: 1.4,
	fontSize: "12px",
	padding: "0px 15px",
	marginBottom: 0,
}));

interface TwoColumnImageProps {
	image1: string;
	image1Caption: string;
	image2: string;
	image2Caption: string;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

const TwoColumnImage = ({
	image1,
	image1Caption,
	image2,
	image2Caption,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: TwoColumnImageProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	return (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : 'section'}>
		<div
			style={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
			}}
		>
			<Container maxWidth={"lg"} style={{ padding: mobileWidth ? "2rem 1.5rem" : "2rem" }}>
				<Grid container spacing={mobileWidth ? 2 : 6}>
					<Grid item xs={12} sm={6} md={6}>
						<div
							style={{
								width: "100%",
								height: mobileWidth ? "310px" : "700px",
								position: "relative",
							}}
						>
							<Image
								alt={image1Caption}
								src={image1 ? image1 : ""}
								layout={"fill"}
								objectFit="cover"
								blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWw8AAd8BLiy87+IAAAAASUVORK5CYII=`}
								placeholder="blur"
							/>
						</div>
						{image1Caption ? (
							<div style={{ textAlign: "center" }}>
								<StyledText
									style={{
										color:
											colorSettings === "Custom"
												? sectionFontColor
												: "#494949",
									}}
								>
									{image1Caption}
								</StyledText>
							</div>
						) : (
							""
						)}
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<div
							style={{
								width: "100%",
								height: mobileWidth ? "310px" : "700px",
								position: "relative",
							}}
						>
							<Image
								alt={image2Caption}
								src={image2 ? image2 : ""}
								layout={"fill"}
								objectFit="cover"
								blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWw8AAd8BLiy87+IAAAAASUVORK5CYII=`}
								placeholder="blur"
							/>
						</div>
						{image2Caption ? (
							<div style={{ textAlign: "center" }}>
								<StyledText
									style={{
										color:
											colorSettings === "Custom"
												? sectionFontColor
												: "#494949",
									}}
								>
									{image2Caption}
								</StyledText>
							</div>
						) : (
							""
						)}
					</Grid>
				</Grid>
			</Container>
		</div>
		// </ScrollableAnchor>
	);
};

export default TwoColumnImage;
