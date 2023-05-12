import React, { useState } from "react";

//Import Components
import { Button, TextField, Alert } from "@mui/material";

import DialogCms from "./DialogCms";

//Import API
// import { api } from "../../../../api/api";

//Import Helper Functions
import { referenceStagingMedia } from "../../../utils/helperFunctions";

interface ImageCarouselCmsBlockProps {
	slidesArray: any;
	deleteSlide: any;
	updateSlide: any;
}

const ImageCarouselCmsBlock = ({
	slidesArray,
	deleteSlide,
	updateSlide,
}: ImageCarouselCmsBlockProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			{slidesArray.map((slide: any) => {
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
					<div
						style={{
							borderBottom: "1px solid #e3e3e3",
							marginBottom: 45,
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

						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name={"imageUrl"}
							label={"Image Url"}
							id={slide.slideId}
							value={slide.imageUrl}
							onChange={(event) => {
								updateSlide(slide.slideId, event.target.name, event.target.value);
							}}
							style={{ width: "100%", marginBottom: 20 }}
						/>
						{/* {isSaved ? (
							containsFieldName ? (
								""
							) : (
								<>
									<Alert severity="warning">
										Image has been saved to media server but not for this field,
										please create an updated link.
									</Alert>
									<Button
										style={{ marginTop: 10 }}
										color="primary"
										variant="contained"
										onClick={() => {
											saveImage(slide.slideId, "imageUrl", slide.imageUrl);
										}}
									>
										Updated Link
									</Button>
								</>
							)
						) : (
							<>
								<Alert severity="warning">
									Image not saved to media server, please upload before saving.
								</Alert>
								<Button
									style={{ marginTop: 10, marginBottom: 30 }}
									color="primary"
									variant="contained"
									onClick={() => {
										saveImage(slide.slideId, "imageUrl", slide.imageUrl);
									}}
								>
									Upload Image
								</Button>
							</>
						)} */}

						<TextField
							fullWidth
							multiline
							variant="outlined"
							id={slide.slideId}
							label={"Caption"}
							name={"caption"}
							value={slide.caption}
							onChange={(event) => {
								updateSlide(slide.slideId, event.target.name, event.target.value);
							}}
							style={{ width: "100%", marginBottom: 20 }}
						/>

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

export default ImageCarouselCmsBlock;
