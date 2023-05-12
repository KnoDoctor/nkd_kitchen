import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

//Import CMS Blocks
import TextCmsBlock from "../../_inputs/TextCmsBlock";
import RadioGroupCmsBlock from "../../_inputs/RadioGroupCmsBlock";
import ColorPickerCmsBlock from "../../_inputs/ColorPickerCmsBlock";

const WysiwygCmsBlock = dynamic(() => import("../../_inputs/WysiwygCmsBlock"), { ssr: false });

import { Grid } from "@mui/material";

interface ParagraphWithHeadingsCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const ParagraphWithHeadingsCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: ParagraphWithHeadingsCmsProps) => {
	const [headingsAlignment, setHeadingsAlignment] = useState(
		section?.headingsAlignment || "Left"
	);

	const [colorSettings, setColorSettings] = useState(section?.colorSettings || "Default");

	const handleColorSettingsChange = (event: any) => {
		setColorSettings(event.target.value);
	};

	const handleHeadingsAlignmentChange = (event: any) => {
		setHeadingsAlignment(event.target.value);
	};

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName: "headingsAlignment",
				value: headingsAlignment,
			},
			section
		);
	}, [headingsAlignment]);

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
					<Grid container>
						<Grid item xs={6}>
							<ColorPickerCmsBlock
								section={section}
								value={section?.sectionButtonColor || "#194666"}
								fieldName={"sectionButtonColor"}
								handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<ColorPickerCmsBlock
								section={section}
								value={section?.sectionButtonFontColor || "#fff"}
								fieldName={"sectionButtonFontColor"}
								handleExplicitSectionDataChange={handleExplicitSectionDataChange}
							/>
						</Grid>
					</Grid>
				</>
			) : (
				<></>
			)}
			<Grid
				container
				style={{
					padding: "20px 0px",
					alignItems: "center",
				}}
			>
				<Grid item xs={12}>
					<h3>Headings Alignment:</h3>
				</Grid>
				<Grid item xs={12}>
					<RadioGroupCmsBlock
						handleOptionChange={(event: any) => {
							handleHeadingsAlignmentChange(event);
						}}
						value={section?.headingsAlignment || "Left"}
						options={["Left", "Centered"]}
						name={"headingsAlignment"}
						fieldName={"headingsAlignment"}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"headline"}
						value={section.headline}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"headlineLink"}
						value={section.headlineLink}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"subheading"}
						value={section.subheading}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"subheadingLink"}
						value={section.subheadingLink}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"specialHeading"}
						value={section.specialHeading}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"specialHeadingLink"}
						value={section.specialHeadingLink}
					/>
				</Grid>
			</Grid>

			<WysiwygCmsBlock
				data={section.content}
				section={section}
				handleExplicitSectionDataChange={handleExplicitSectionDataChange}
				fieldName={"content"}
			/>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"ctaButtonText"}
						value={section.ctaButtonText}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"ctaButtonLink"}
						value={section.ctaButtonLink}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default ParagraphWithHeadingsCms;
