import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";

//Import Material-UI Components
import { Grid } from "@mui/material";

//Import CMS Blocks
import ImageCmsBlock from "../../_inputs/ImageCmsBlock";
import ToggleSwitchCmsBlock from "../../_inputs/ToggleSwitchCmsBlock";
import RadioGroupCmsBlock from "../../_inputs/RadioGroupCmsBlock";
import ColorPickerCmsBlock from "../../_inputs/ColorPickerCmsBlock";
import TextCmsBlock from "../../_inputs/TextCmsBlock";

const WysiwygCmsBlock = dynamic(() => import("../../_inputs/WysiwygCmsBlock"), { ssr: false });

interface ImageLeftTextRightCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const ImageLeftTextRightCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: ImageLeftTextRightCmsProps) => {
	const [fixedTextContent, setFixedTextContent] = useState(section?.fixedTextContent || false);

	const [colorSettings, setColorSettings] = useState(section?.colorSettings || "Default");

	const handleColorSettingsChange = (event: any) => {
		setColorSettings(event.target.value);
	};

	const handleInputChange = (event: any) => {
		setFixedTextContent(event.target.checked);
	};

	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName: "fixedTextContent",
				value: fixedTextContent,
			},
			section
		);
	}, [fixedTextContent]);

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
									handleExplicitSectionDataChange={
										handleExplicitSectionDataChange
									}
								/>
							</Grid>
							<Grid item xs={6}>
								<ColorPickerCmsBlock
									section={section}
									value={section?.sectionFontColor || "#494949"}
									fieldName={"sectionFontColor"}
									handleExplicitSectionDataChange={
										handleExplicitSectionDataChange
									}
								/>
							</Grid>
						</Grid>
					</>
				) : (
					<></>
				)}
			</div>
			<div style={{ paddingTop: 30 }}>
				Contain the text content at a fixed height that's scrollable
				<ToggleSwitchCmsBlock
					value={section?.fixedTextContent || false}
					handleInputChange={handleInputChange}
					leftOption={"off"}
					rightOption={"on"}
					name={"fixedTextContent"}
				/>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<ImageCmsBlock
						value={section.imageLeft}
						fieldName={"imageLeft"}
						handleSectionDataChange={handleSectionDataChange}
						section={section}
						// launchLoginModal={launchLoginModal}
						// handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"title"}
						value={section.title}
					/>
					<TextCmsBlock
						section={section}
						// handleSectionDataChange={handleSectionDataChange}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"subtitle"}
						value={section.subtitle}
					/>
					<WysiwygCmsBlock
						data={section.content}
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"content"}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default ImageLeftTextRightCms;
