import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ExperienceDesignerAutocompleteCmsBlockProps {
	value: string;
	fieldName: string;
	handleExplicitSectionDataChange: any;
	section: any;
}

export default function ExperienceDesignerAutocompleteCmsBlock({
	value,
	fieldName,
	handleExplicitSectionDataChange,
	section,
}: ExperienceDesignerAutocompleteCmsBlockProps) {
	const [fieldValue, setFieldValue] = useState(value ? value : null);
	const [inputValue, setInputValue] = useState("");
	const [experienceDesigners, setExperienceDesigners] = useState([]);
	const [experienceDesigner, setExperienceDesigner] = useState<any>(null);

	const getExperienceDesigners = async () => {
		let res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/tripDesigners/");
		let data = await res.json();

		setExperienceDesigners(data.systemUsers);
	};

	const getExperienceDesignerData = async () => {
		if (fieldValue) {
			let res = await fetch(
				`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/tripDesigners/${fieldValue}`
			);

			let data = await res.json();

			setExperienceDesigner(data.systemUser);
		} else {
			setExperienceDesigner(null);
		}
	};

	//Fetch Data
	useEffect(() => {
		getExperienceDesigners();
	}, []);

	useEffect(() => {
		getExperienceDesignerData();
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: fieldValue,
			},
			section
		);
	}, [fieldValue]);

	return (
		<div>
			<h4>{fieldName}</h4>
			{/* <div>{`value: ${
                fieldValue !== null ? `'${fieldValue}'` : "null"
            }`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
			{experienceDesigner ? (
				<div>
					<div
						style={{
							zIndex: "0",
							position: "relative",
							width: "300px",
							height: "300px",
							margin: "auto",
						}}
					>
						<img
							src={experienceDesigner.photourl}
							alt="experience-designer-image"
							style={{
								objectFit: "cover",
								height: "100%",
								width: "100%",
								borderRadius: "50%",
							}}
						></img>
					</div>
					<div style={{ textAlign: "center" }}>
						<h3>
							{experienceDesigner.fullname}{" "}
							<IconButton
								onClick={() => {
									setFieldValue(null);
									setInputValue("");
								}}
								aria-label="clear"
							>
								<ClearIcon fontSize="small" />
							</IconButton>
						</h3>
					</div>
				</div>
			) : (
				<></>
			)}
			<Autocomplete
				onChange={(event, newValue: any) => {
					if (newValue) {
						setFieldValue(newValue.systemuserid);
					} else {
						setFieldValue(null);
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="experience-designer-autocomplete-field"
				options={experienceDesigners}
				getOptionLabel={(designer) => designer.fullname}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for an experience designer..."
						variant="outlined"
						inputProps={{
							...params.inputProps,
							autoComplete: "new-password", // disable autocomplete and autofill
						}}
					/>
				)}
			/>
		</div>
	);
}
