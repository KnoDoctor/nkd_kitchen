import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

//Import CMS Block
import TextCmsBlock from "../../_inputs/TextCmsBlock";
import RadioGroupCmsBlock from "../../_inputs/RadioGroupCmsBlock";
import ColorPickerCmsBlock from "../../_inputs/ColorPickerCmsBlock";
import CategoryArrayInput from "../../_inputs/CategoryArrayInput";

//Experimental///
import Referencer from "../../____wip/inputs/Referencer";
////////////////

const WysiwygCmsBlock = dynamic(() => import("../../_inputs/WysiwygCmsBlock"), { ssr: false });

//Import Material-UI Components
import { Grid } from "@mui/material";

import useCategories from "../../../../hooks/categories/useCategories";

interface CategorySectionCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const CategorySectionCms = ({
	section,
	handleExplicitSectionDataChange,
}: CategorySectionCmsProps) => {
	const [colorSettings, setColorSettings] = useState(section?.colorSettings || "Default");
	const [displayColorPickers, setDisplayColorPickers] = useState(
		section?.colorSettings === "Custom"
	);

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
		if (colorSettings === "Custom") {
			setDisplayColorPickers(true);
		} else {
			setDisplayColorPickers(false);
		}
	}, [colorSettings]);

	return (
		<div style={{ width: "100%" }}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"sectionTitle"}
						value={section.sectionTitle}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextCmsBlock
						section={section}
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
			{displayColorPickers ? (
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
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<TextCmsBlock
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"sectionHeadline"}
						value={section.sectionHeadline}
					/>
				</Grid>
				<Grid item xs={12}>
					<WysiwygCmsBlock
						data={section.sectionContent}
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"sectionContent"}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Referencer
						entityName="categories"
						useHook={useCategories}
						entityFieldPrefix="category"
						section={section}
						fieldName="featuredCategories"
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default CategorySectionCms;
