//React & Material-UI Imports
import React from "react";

import { Container, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Element, isText } from "domhandler";

import Button from "../../../_atoms/Button";

//Import Link from next
import Link from "next/link";

import parse, { attributesToProps } from "html-react-parser";

//Import Scrollable Anchor
// import ScrollableAnchor from 'react-scrollable-anchor';

const StyledParagraphContainer = styled(Container)(() => ({
	// padding: "2rem 1rem 1px",
	"& a > h2:hover": {
		color: "#C4635F",
	},
	"& a > h3:hover": {
		color: "#C4635F",
	},
	"& a > h4:hover": {
		color: "#C4635F",
	},
	"& p:first-child": {
		marginTop: 0,
	},
	"& p:last-child": {
		marginBottom: 0,
	},
}));

const StyledText = styled("div")(({ theme }) => ({
	fontFamily: theme.typography.body1.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	lineHeight: 1.4,
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

const StyledH3 = styled("h3")(({ theme }) => ({
	fontFamily: theme.typography.body1.fontFamily,
	fontSize: "20px",
	fontWeight: 300,
	marginTop: "5px",
	marginBottom: "5px",
}));

const StyledH4 = styled("h4")(({ theme }) => ({
	fontFamily: theme.typography.h1.fontFamily,
	fontSize: "16px",
	fontWeight: 300,
	fontStyle: "italic",
	marginTop: "5px",
	marginBottom: "1rem",
}));

interface ParagraphProps {
	headingsAlignment: string;
	headline: string;
	subheading: string;
	specialHeading: string;
	content: string;
	headlineLink: string;
	subheadingLink: string;
	specialHeadingLink: string;
	ctaButtonLink: string;
	ctaButtonText: string;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionButtonColor: string;
	sectionButtonFontColor: string;
	sectionAnchor?: string;
}

const BrParagraph = ({
	headingsAlignment,
	headline,
	subheading,
	specialHeading,
	content,
	headlineLink,
	subheadingLink,
	specialHeadingLink,
	ctaButtonLink,
	ctaButtonText,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionButtonColor,
	sectionButtonFontColor,
	sectionAnchor,
}: ParagraphProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	return (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : 'section'}>
		<div
			style={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
				padding: mobileWidth ? "2rem 0.5rem" : "2rem 0rem",
			}}
		>
			<StyledParagraphContainer maxWidth={"lg"}>
				<div
					style={{
						textAlign: headingsAlignment === "Centered" ? "center" : "left",
					}}
				>
					{headline && headlineLink ? (
						<Link href={headlineLink}>
							<Typography
								variant="h4"
								style={{
									marginBottom: subheading || specialHeading ? "5px" : 15,
									color:
										colorSettings === "Custom" ? sectionFontColor : "#494949",
									fontSize: "24px",
									fontWeight: 300,
									textTransform: "uppercase",
									marginTop: "5px",
								}}
							>
								{headline}
							</Typography>
						</Link>
					) : headline ? (
						<Typography
							variant="h4"
							style={{
								marginBottom: subheading || specialHeading ? "5px" : 15,
								color: colorSettings === "Custom" ? sectionFontColor : "#494949",
								fontSize: "24px",
								fontWeight: 300,
								textTransform: "uppercase",
								marginTop: "5px",
							}}
						>
							{headline}
						</Typography>
					) : (
						<></>
					)}

					{subheading && subheadingLink ? (
						<Link href={subheadingLink}>
							<StyledH3
								style={{
									marginBottom: specialHeading ? "5px" : "10px",
									color:
										colorSettings === "Custom" ? sectionFontColor : "#494949",
								}}
							>
								{subheading}
							</StyledH3>
						</Link>
					) : subheading ? (
						<StyledH3
							style={{
								marginBottom: specialHeading ? "5px" : "10px",
								color: colorSettings === "Custom" ? sectionFontColor : "#494949",
							}}
						>
							{subheading}
						</StyledH3>
					) : (
						<></>
					)}

					{specialHeading && specialHeadingLink ? (
						<Link href={specialHeadingLink}>
							<StyledH4
								style={{
									color:
										colorSettings === "Custom" ? sectionFontColor : "#3E739B",
								}}
							>
								{specialHeading}
							</StyledH4>
						</Link>
					) : specialHeading ? (
						<StyledH4
							style={{
								color: colorSettings === "Custom" ? sectionFontColor : "#3E739B",
							}}
						>
							{specialHeading}
						</StyledH4>
					) : (
						<></>
					)}
				</div>

				{content && content != "<p><br></p>" ? (
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
				) : (
					<></>
				)}

				{ctaButtonText && ctaButtonLink ? (
					<div
						style={{
							textAlign: "center",
							marginTop: 35,
							marginBottom: "3rem",
						}}
					>
						<Link
							href={ctaButtonLink}
							style={{
								display: "inline-block",
								marginTop: "20px",
							}}
						>
							<Button
								sx={{
									background:
										colorSettings === "Custom" ? sectionButtonColor : "#194666",
									color:
										colorSettings === "Custom"
											? sectionButtonFontColor
											: "#fff",
									width: "147px",
									fontSize: "14px",
								}}
							>
								{ctaButtonText}
							</Button>
						</Link>
					</div>
				) : (
					<></>
				)}
			</StyledParagraphContainer>
		</div>
		//   </ScrollableAnchor>
	);
};

export default BrParagraph;
