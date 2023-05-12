//React & Material-UI Imports
import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Typography } from "@mui/material";

//Import Scrollable Anchor
// import ScrollableAnchor from 'react-scrollable-anchor';

interface QuoteProps {
	quote: string;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

const Quote = ({
	quote,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: QuoteProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	return quote ? (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : 'section'}>
		<div
			style={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
			}}
		>
			<div
				style={{
					maxWidth: mobileWidth ? "none" : "70%",
					margin: "auto",
					padding: "4.5rem 1.5rem",
				}}
			>
				<Typography
					variant="body1"
					sx={{
						color: colorSettings === "Custom" ? sectionFontColor : "#494949",
						fontSize: "17px",
						lineHeight: 1.4,
						fontStyle: "italic",
						textAlign: "center",
					}}
				>
					"{quote}"
				</Typography>
			</div>
		</div>
	) : (
		// </ScrollableAnchor>
		<></>
	);
};

export default Quote;
