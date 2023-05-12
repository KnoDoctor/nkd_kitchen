import React, { useState, useEffect } from "react";

//Import Material-UI Components
import { Grid } from "@mui/material";

//Import CMS Block
import ImageCmsBlock from "../../_inputs/ImageCmsBlock";
import TextCmsBlock from "../../_inputs/TextCmsBlock";
import RadioGroupCmsBlock from "../../_inputs//RadioGroupCmsBlock";
import ColorPickerCmsBlock from "../../_inputs//ColorPickerCmsBlock";

interface TwoColumnImageCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const TwoColumnImageCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: TwoColumnImageCmsProps) => {
	const [colorSettings, setColorSettings] = useState(section?.colorSettings || "Default");

	const handleColorSettingsChange = (event: any) => {
		setColorSettings(event.target.value);
	};

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName: "colorSettings",
				value: colorSettings,
			},
			section
		);
	}, [colorSettings]);

	return (
		<>
			<div>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6}>
						<TextCmsBlock
							section={section}
							// handleSectionDataChange={handleSectionDataChange}
							handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							fieldName={"sectionTitle"}
							value={section.sectionTitle}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextCmsBlock
							section={section}
							// handleSectionDataChange={handleSectionDataChange}
							handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							fieldName={"sectionAnchor"}
							value={section.sectionAnchor}
						/>
					</Grid>
				</Grid>
				<h3>Section Colors</h3>
				<RadioGroupCmsBlock
					handleOptionChange={(event: any) => {
						handleColorSettingsChange(event);
					}}
					value={colorSettings}
					options={["Default", "Custom"]}
					name={"colorSettings"}
					fieldName={"colorSettings"}
				/>
			</div>
			{colorSettings === "Custom" ? (
				<>
					<Grid
						container
						style={{
							padding: "20px 0px",
							alignItems: "center",
						}}
					>
						<Grid item xs={6}>
							<ColorPickerCmsBlock
								section={section}
								value={section?.sectionBackgroundColor || "transparent"}
								fieldName={"sectionBackgroundColor"}
								handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<ColorPickerCmsBlock
								section={section}
								value={section?.sectionFontColor || "#494949"}
								fieldName={"sectionFontColor"}
								handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							/>
						</Grid>
					</Grid>
				</>
			) : (
				<></>
			)}

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<ImageCmsBlock
						value={section.image1}
						fieldName={"image1"}
						handleSectionDataChange={handleSectionDataChange}
						section={section}
						// handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"image1Caption"}
						value={section.image1Caption}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ImageCmsBlock
						value={section.image2}
						fieldName={"image2"}
						handleSectionDataChange={handleSectionDataChange}
						section={section}
						// handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"image2Caption"}
						value={section.image2Caption}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default TwoColumnImageCms;
