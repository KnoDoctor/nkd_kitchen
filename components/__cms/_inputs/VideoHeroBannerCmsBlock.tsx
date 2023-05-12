import React from "react";

import { Grid, TextField } from "@mui/material";

//Import CMS Blocks
import RadioGroupCmsBlock from "./RadioGroupCmsBlock";

interface VideoHeroBannerCmsBlockProps {
	handleVideoHeroBannerUpdate: any;
	section: any;
}

const VideoHeroBannerCmsBlock = ({
	handleVideoHeroBannerUpdate,
	section,
}: VideoHeroBannerCmsBlockProps) => {
	const handleContentAlignment = (event: any) => {
		handleVideoHeroBannerUpdate(event.target.name, event.target.value);
	};

	return (
		<div>
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				// fieldName={"videoHeroBannerUrl"}
				name={"videoHeroBannerUrl"}
				label={"Video Url"}
				value={section?.videoHeroBanner?.videoHeroBannerUrl}
				onChange={(event) => {
					handleVideoHeroBannerUpdate(event.target.name, event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				// fieldName={"videoCoverImageUrl"}
				name={"videoCoverImageUrl"}
				label={"Video Cover Image Url"}
				value={section?.videoHeroBanner?.videoCoverImageUrl}
				onChange={(event) => {
					handleVideoHeroBannerUpdate(event.target.name, event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
			<Grid
				container
				style={{
					padding: "20px 0px",
					alignItems: "center",
				}}
			>
				<Grid item xs={12}>
					<h3 style={{ marginBottom: 0 }}>Text Content Alignment:</h3>
				</Grid>
				<Grid item xs={12}>
					<RadioGroupCmsBlock
						handleOptionChange={(event: any) => {
							handleContentAlignment(event);
						}}
						value={section?.videoHeroBanner?.contentAlignment || "Left"}
						options={["Left", "Centered"]}
						name={"contentAlignment"}
						fieldName={"contentAlignment"}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						multiline
						variant="outlined"
						label={"Primary Copy"}
						name={"primaryCopy"}
						value={section?.videoHeroBanner?.primaryCopy}
						onChange={(event) => {
							handleVideoHeroBannerUpdate(event.target.name, event.target.value);
						}}
						style={{ width: "100%", marginBottom: 20 }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						multiline
						variant="outlined"
						label={"Secondary Copy"}
						name={"secondaryCopy"}
						value={section?.videoHeroBanner?.secondaryCopy}
						onChange={(event) => {
							handleVideoHeroBannerUpdate(event.target.name, event.target.value);
						}}
						style={{ width: "100%", marginBottom: 20 }}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default VideoHeroBannerCmsBlock;
