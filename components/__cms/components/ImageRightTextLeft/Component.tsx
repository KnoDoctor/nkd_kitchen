import React from "react";
import Image from "next/image";

import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";

import parse, { attributesToProps } from "html-react-parser";

import { Element, isText } from "domhandler";

//Import Scrollable Anchor
// import ScrollableAnchor from "react-scrollable-anchor";

const StyledText = styled("div")(({ theme }) => ({
	fontFamily: theme.typography.body1.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	lineHeight: 1.4,
	color: "#494949",
	"& p:first-child": {
		marginTop: 0,
	},
	"& p:last-child": {
		marginBottom: 0,
	},
	"& a": {
		fontFamily: theme.typography.body1.fontFamily,
		fontSize: theme.typography.body1.fontSize,
		fontWeight: 300,
		color: "#3E739B",
		textDecoration: "underline",
	},
	"& a:hover": {
		color: "#3E739B",
	},
	"& p span": {
		backgroundColor: "transparent !important",
		color: "inherit !important",
	},
}));

const StyledTitle = styled("h3")(({ theme }) => ({
	fontFamily: theme.typography.h1.fontFamily,
	fontWeight: 300,
	marginTop: 0,
}));

interface ImageRightTextLeftProps {
	image: string;
	title: string;
	subtitle: string;
	content: string;
	fixedTextContent: boolean;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

const ImageRightTextLeft = ({
	image,
	title,
	subtitle,
	content,
	fixedTextContent,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: ImageRightTextLeftProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	return image && content ? (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : "section"}>
		<div
			style={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
			}}
		>
			<Container
				maxWidth={"lg"}
				style={{
					padding: mobileWidth ? "0" : "2rem 0rem",
					background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
				}}
			>
				<Grid
					container
					spacing={mobileWidth ? 0 : 0}
					style={{
						display: "flex",
						flexDirection: mobileWidth ? "column-reverse" : "row",
					}}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}
						className={"textLeftImageRight"}
						style={{
							maxHeight: fixedTextContent ? "600px" : "none",
							overflowY: fixedTextContent ? "scroll" : "unset",
							padding: mobileWidth ? "24px" : "0px 24px",
						}}
					>
						{title || subtitle ? (
							<div>
								<StyledTitle
									style={{
										fontSize: 24,
										marginBottom: 5,
										color:
											colorSettings === "Custom"
												? sectionFontColor
												: "#494949",
									}}
								>
									{title}
								</StyledTitle>
								<StyledTitle
									style={{
										fontSize: 17,
										fontStyle: "italic",
										color:
											colorSettings === "Custom"
												? sectionFontColor
												: "#494949",
									}}
								>
									{subtitle}
								</StyledTitle>
							</div>
						) : (
							<></>
						)}
						<StyledText
							style={{
								color: colorSettings === "Custom" ? sectionFontColor : "#494949",
							}}
						>
							{parse(content, {
								trim: true,
								replace: (domNode) => {
									if (
										domNode instanceof Element &&
										domNode.attribs &&
										domNode.name === "a"
									) {
										const props = attributesToProps(domNode.attribs);
										const { target, ...remainingProps } = props;
										return (
											<a {...remainingProps}>
												{isText(domNode.children[0]) ? (
													domNode.children[0].data
												) : (
													<></>
												)}
											</a>
										);
									}
								},
							})}
						</StyledText>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}
						style={{
							padding: mobileWidth ? "24px" : "0px 24px",
						}}
					>
						<div
							style={{
								width: "100%",
								height: mobileWidth ? "350px" : "100%",
								minHeight: mobileWidth ? "100px" : "500px",
								position: "relative",
							}}
						>
							<Image
								alt={title}
								src={image ? image : ""}
								layout={"fill"}
								objectFit="cover"
								blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWw8AAd8BLiy87+IAAAAASUVORK5CYII=`}
								placeholder="blur"
							/>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	) : (
		// </ScrollableAnchor>
		<></>
	);
};

export default ImageRightTextLeft;
