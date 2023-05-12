import React, { useState } from "react";

//Import Material-UI Components
import { Button, TextField, Grid } from "@mui/material";

//Import CMS Blocks
import RadioGroupCmsBlock from "./RadioGroupCmsBlock";
import DialogCms from "./DialogCms";

//Import Helper Functions
import { referenceStagingMedia } from "../../../utils/helperFunctions";

interface HeroImageCarouselCmsBlockProps {
	slidesArray: any;
	deleteSlide: any;
	updateSlide: any;
}

const HeroBannerImageVideoCarouselCmsBlock = ({
	slidesArray,
	deleteSlide,
	updateSlide,
}: HeroImageCarouselCmsBlockProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleHeroBannerType = (event: any, slideId: string) => {
		updateSlide(slideId, event.target.name, event.target.value);
	};

	const handleContentAlignment = (event: any, slideId: string) => {
		updateSlide(slideId, event.target.name, event.target.value);
	};

	const handleModalClose = () => {
		setIsModalOpen(!isModalOpen);
	};

	const saveImage = (slideId: string, fieldName: string, imageUrl: string) => {
		//Set Save Image POST Object
		const saveImageObject = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: {
				fileName:
					"collection-image" +
					"_" +
					fieldName +
					"_" +
					slideId +
					"_" +
					Date.now() +
					".jpg",
				url: imageUrl,
			},
		};

		// TO REPLACE IMAGE SAVING FUNCTION
		// api("https://staging.api.butterfield.com/v1/photos/addPhoto", saveImageObject)
		// 	.then((imageSaveResponse) => {
		// 		let path = imageSaveResponse.path;
		// 		let file = path.substring(path.lastIndexOf("/") + 1);

		// 		updateSlide(slideId, fieldName, "https://media.butterfield.com" + "/" + file);
		// 	})
		// 	.catch(() => {
		// 		console.log("Login Expired");
		// 		localStorage.setItem("token", "expired");
		// 		localStorage.setItem("loggedIn", "false");
		// 		launchLoginModal();
		// 	});
	};

	return (
		<div>
			{slidesArray.map((slide: any, i: any) => {
				let url = slide.imageUrl;
				let isSaved = false;
				let containsFieldName = false;

				if (url != null) {
					if (url.indexOf("https://") > -1 || url.indexOf("http://") > -1) {
						if (url.indexOf("https://media.butterfield.com") > -1) {
							isSaved = true;
						}
						if (url.indexOf("imageUrl") > -1) {
							containsFieldName = true;
						}
					} else {
						isSaved = true;
						containsFieldName = true;
					}
				} else {
					isSaved = true;
					containsFieldName = true;
				}

				return (
					<div>
						<div>
							<h2 style={{ marginTop: 30 }}>{`Slide #${i + 1}`}</h2>
						</div>
						<h3 style={{ marginBottom: 0 }}>Hero Banner Type:</h3>
						<RadioGroupCmsBlock
							handleOptionChange={(event: any) => {
								handleHeroBannerType(event, slide.slideId);
							}}
							value={slide.heroBannerType}
							options={["Image", "Video"]}
							name={"heroBannerType"}
							fieldName={"heroBannerType"}
						/>

						{slide.heroBannerType === "Image" ? (
							<div
								style={{
									marginTop: 30,
								}}
							>
								<div style={{ maxWidth: 400 }}>
									<img
										style={{ width: "100%" }}
										src={referenceStagingMedia(slide.imageUrl)}
										alt={"image"}
									/>
								</div>

								<Button
									style={{ marginTop: 10 }}
									color="primary"
									variant="contained"
									onClick={() => {
										setIsModalOpen(!isModalOpen);
									}}
								>
									Find Image
								</Button>

								<h3 style={{ marginBottom: 0 }}>Image URL:</h3>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name={"imageUrl"}
									label={"Image Url"}
									id={slide.slideId}
									value={slide.imageUrl}
									onChange={(event) => {
										updateSlide(
											slide.slideId,
											event.target.name,
											event.target.value
										);
									}}
									style={{ width: "100%", marginBottom: 20 }}
								/>
							</div>
						) : (
							<>
								<h3 style={{ marginBottom: 0 }}>Video URL:</h3>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name={"videoUrl"}
									label={"Video Url"}
									id={slide.slideId}
									value={slide.videoUrl}
									onChange={(event) => {
										updateSlide(
											slide.slideId,
											event.target.name,
											event.target.value
										);
									}}
									style={{ width: "100%", marginBottom: 20 }}
								/>
								<h3 style={{ marginBottom: 0 }}>Video Cover Image URL</h3>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name={"videoCoverImageUrl"}
									label={"Video Cover Image Url"}
									id={slide.slideId}
									value={slide.videoCoverImageUrl}
									onChange={(event) => {
										updateSlide(
											slide.slideId,
											event.target.name,
											event.target.value
										);
									}}
									style={{ width: "100%", marginBottom: 20 }}
								/>
							</>
						)}

						<div>
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
											handleContentAlignment(event, slide.slideId);
										}}
										value={slide.contentAlignment}
										options={["Left", "Centered", "Right"]}
										name={"contentAlignment"}
										fieldName={"contentAlignment"}
									/>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={4}>
									<h3 style={{ marginBottom: 0 }}>Slide Title:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Slide Title"}
										name={"title"}
										value={slide.title}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<h3 style={{ marginBottom: 0 }}>Slide Subtitle:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Slide Subtitle"}
										name={"subtitle"}
										value={slide.subtitle}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<h3 style={{ marginBottom: 0 }}>Text Color:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Example: #494949"}
										name={"textColor"}
										value={slide.textColor}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
							</Grid>

							<Grid
								container
								spacing={2}
								style={{
									paddingBottom: "20px",
									alignItems: "center",
								}}
							>
								<Grid item xs={6}>
									<h3 style={{ marginBottom: 0 }}>Button Text:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Button Text"}
										name={"buttonText"}
										value={slide.buttonText}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
								<Grid item xs={6}>
									{/* <RadioGroupCmsBlock
										handleOptionChange={(event: any) => {
											handleHeroBannerCtaButtonColor(event, slide.slideId);
										}}
										value={slide.buttonColor}
										options={["Blue", "White", "Red", "Green"]}
										name={"buttonColor"}
										fieldName={"buttonColor"}
									/> */}
									<h3 style={{ marginBottom: 0 }}>Button Link:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Button Link"}
										name={"buttonLink"}
										value={slide.buttonLink}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<h3 style={{ marginBottom: 0 }}>Button Text Color:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Example: #494949"}
										name={"buttonTextColor"}
										value={slide.buttonTextColor}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<h3 style={{ marginBottom: 0 }}>Button Background Color:</h3>
									<TextField
										fullWidth
										multiline
										variant="outlined"
										id={slide.slideId}
										label={"Example: #494949"}
										name={"buttonColor"}
										value={slide.buttonColor}
										onChange={(event) => {
											updateSlide(
												slide.slideId,
												event.target.name,
												event.target.value
											);
										}}
										style={{ width: "100%", marginBottom: 20 }}
									/>
								</Grid>
							</Grid>

							<div style={{ textAlign: "right" }}>
								<Button
									onClick={() => deleteSlide(slide.slideId)}
									style={{
										background: "#194666",
										color: "#fff",
										marginBottom: 40,
									}}
								>
									Delete Slide
								</Button>
							</div>
							<hr style={{ color: "#494949" }} />
						</div>
					</div>
				);
			})}

			<DialogCms
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				source={"https://demo3.piwigo.com/"}
			/>
		</div>
	);
};

export default HeroBannerImageVideoCarouselCmsBlock;
