import React, { useState, useEffect } from "react";

//Import API
// import { api } from "../../../../api/api";

//Import Material-UI Components
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

//Import CMS Components
import DialogCms from "./DialogCms";

import { referenceStagingMedia } from "../../../utils/helperFunctions";

interface ImageCmsProps {
	value: string;
	fieldName: string;
	section?: any;
	id?: any;
	setValue?(value: string): void;
	updateField?(id: any, fieldName: string, value: string): void;
	// launchLoginModal: any;
}

const ImageCms = ({
	value,
	fieldName,
	section,
	updateField,
	setValue,
	id,
}: // launchLoginModal
ImageCmsProps) => {
	const [textFieldValue, setTextFieldValue] = useState(value ? value : "");
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleModalClose = () => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		if (setValue) {
			setValue(textFieldValue);
		}
		if (updateField) {
			updateField(id, fieldName, textFieldValue);
		}
	}, [textFieldValue]);

	return (
		<div>
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
				name={section.sectionName}
				label={"Image URL"}
				id={section.sectionName}
				value={textFieldValue}
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

export default ImageCms;
