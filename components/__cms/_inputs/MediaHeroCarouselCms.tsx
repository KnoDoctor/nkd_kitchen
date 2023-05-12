import React, { useState, useEffect } from "react";

//Import Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import RadioGroupCms from "./RadioGroupCms";
import DialogCms from "./DialogCms";

// //Import API
// import { api } from "../../../../api/api";

//Import Helper Functions
import { referenceStagingMedia } from "../../../utils/helperFunctions";

interface MediaHeroCarouselCmsProps {
	updateSlide(id: string, fieldName: string, value: string): void;
	fieldName: string;
	id: string;
	section: any;
	value: string;
	slideType: string;
}

const MediaHeroCarouselCms = ({
	updateSlide,
	fieldName,
	id,
	section,
	value,
	slideType,
}: MediaHeroCarouselCmsProps) => {
	const [textFieldValue, setTextFieldValue] = useState(value);
	const [bannerOption, setBannerOption] = useState(slideType || "image");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleBannerOptionChange = (event: any) => {
		setBannerOption(event.target.value);
	};

	const handleModalClose = () => {
		setIsModalOpen(!isModalOpen);
	};

	let url = value;
	let isSaved = false;
	let containsFieldName = false;

	if (url != null) {
		if (url.indexOf("https://") > -1 || url.indexOf("http://") > -1) {
			if (url.indexOf("https://media.butterfield.com") > -1) {
				isSaved = true;
			}
			if (url.indexOf(fieldName) > -1) {
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

	const saveImage = () => {
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
					section.sectionId +
					"_" +
					Date.now() +
					".jpg",
				url: url,
			},
		};

		// TO REPLACE IMAGE SAVING FUNCTION
		// api("https://staging.api.butterfield.com/v1/photos/addPhoto", saveImageObject)
		// 	.then((imageSaveResponse) => {
		// 		let path = imageSaveResponse.path;
		// 		let file = path.substring(path.lastIndexOf("/") + 1);

		// 		// handleExplicitSectionDataChange(
		// 		// 	{
		// 		// 		fieldName,
		// 		// 		value: "https://media.butterfield.com" + "/" + file,
		// 		// 	},
		// 		// 	section
		// 		// );
		// 	})
		// 	.catch(() => {
		// 		console.log("Login Expired");
		// 		localStorage.setItem("token", "expired");
		// 		localStorage.setItem("loggedIn", "false");
		// 		launchLoginModal();
		// 		//window.location = "/login";
		// 	});
	};

	useEffect(() => {
		updateSlide(id, "mediaUrl", textFieldValue);
	}, [textFieldValue]);

	useEffect(() => {
		updateSlide(id, "slideType", bannerOption);
	}, [bannerOption]);

	return (
		<div>
			<div>
				<RadioGroupCms
					options={["image", "video"]}
					name={"mediaBannerType"}
					value={bannerOption}
					handleOptionChange={handleBannerOptionChange}
				/>
			</div>
			<div style={{ maxWidth: 400 }}>
				<img style={{ width: "100%" }} src={referenceStagingMedia(url)} alt={fieldName} />
			</div>

			{bannerOption === "image" ? (
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
			) : (
				<></>
			)}

			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				name={section.sectionName}
				label={"Media URL"}
				id={section.sectionName}
				value={url}
				onChange={(event) => setTextFieldValue(event.target.value)}
			/>
			{/* {isSaved ? (
				containsFieldName ? (
					""
				) : (
					<>
						<Alert severity="warning">
							Image has been saved to media server but not for this field, please
							create an updated link.
						</Alert>
						<Button
							style={{ marginTop: 10 }}
							color="primary"
							variant="contained"
							onClick={() => {
								saveImage();
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
						style={{ marginTop: 10 }}
						color="primary"
						variant="contained"
						onClick={() => {
							saveImage();
						}}
					>
						Upload Image
					</Button>
				</>
			)} */}

			<DialogCms
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				source={"https://demo3.piwigo.com/"}
			/>
		</div>
	);
};

export default MediaHeroCarouselCms;
