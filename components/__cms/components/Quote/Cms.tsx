import React, { useState, useEffect } from "react";

//Import CMS Block
import TextCmsBlock from "../../_inputs/TextCmsBlock";
import RadioGroupCmsBlock from "../../_inputs/RadioGroupCmsBlock";
import ColorPickerCmsBlock from "../../_inputs/ColorPickerCmsBlock";

//Import Material-UI Components
import { Grid } from "@mui/material";

interface SectionQuoteCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const QuoteCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: SectionQuoteCmsProps) => {
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
		<div style={{ width: "100%" }}>
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
			<TextCmsBlock
				section={section}
				// handleSectionDataChange={handleSectionDataChange}
				handleExplicitSectionDataChange={handleExplicitSectionDataChange}
				fieldName={"quote"}
				value={section.quote}
			/>
		</div>
	);
};

export default QuoteCms;
