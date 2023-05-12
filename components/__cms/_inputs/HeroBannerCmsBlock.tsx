import React, { useState } from "react";

//Import API
// import { api } from "../../../../api/api";

//Import Components
import { Button, TextField, Alert } from "@mui/material";

import DialogCms from "./DialogCms";

import { referenceStagingMedia } from "../../../utils/helperFunctions";

interface HeroBannerCmsBlockProps {
	value: string;
	fieldName: string;
	handleInputChange: any;
	launchLoginModal: any;
	handleExplicitInputChange: any;
}

const HeroBannerCmsBlock = ({
	value,
	fieldName,
	handleInputChange,
	launchLoginModal,
	handleExplicitInputChange,
}: HeroBannerCmsBlockProps) => {
	let url = value;
	let isSaved = false;
	let containsFieldName = false;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalClose = () => {
		setIsModalOpen(!isModalOpen);
	};

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
				fileName: "hero-banner-image" + "_" + fieldName + "_" + Date.now() + ".jpg",
				url: url,
			},
		};

		// TO REPLACE IMAGE SAVING FUNCTION
		// api("https://staging.api.butterfield.com/v1/photos/addPhoto", saveImageObject)
		// 	.then((imageSaveResponse) => {
		// 		let path = imageSaveResponse.path;
		// 		let file = path.substring(path.lastIndexOf("/") + 1);

		// 		handleExplicitInputChange({
		// 			fieldName,
		// 			value: "https://media.butterfield.com" + "/" + file,
		// 		});
		// 	})
		// 	.catch(() => {
		// 		console.log("Login Expired");
		// 		localStorage.setItem("token", "expired");
		// 		localStorage.setItem("loggedIn", "false");
		// 		launchLoginModal();
		// 		//window.location = "/login";
		// 	});
	};

	return (
		<div>
			<h4 style={{ marginTop: 0 }}>{fieldName}</h4>
			<div style={{ maxWidth: 400 }}>
				<img style={{ width: "100%" }} src={referenceStagingMedia(url)} alt={fieldName} />
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
				name={fieldName}
				label={fieldName}
				type={fieldName}
				id={fieldName}
				autoComplete="current-trip"
				value={url}
				onChange={(event) => handleInputChange(event)}
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

export default HeroBannerCmsBlock;
