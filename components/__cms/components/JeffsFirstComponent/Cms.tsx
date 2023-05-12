import { useState } from "react";

import { Grid } from "@mui/material";

import TextCmsBlock from "../../_inputs/TextCmsBlock";
import ImageCmsBlock from "../../_inputs/ImageCmsBlock";
import DataFetchAutocompleteInput from "../../_inputs/DataFetchAutocompleteInput";

import JeffsFirstComponent from "./Component";

interface JeffsFirstComponentCmsProps {
	section: any;
	handleSectionDataChange: any;
	handleExplicitSectionDataChange: any;
}

const JeffsFirstComponentCms = ({
	section,
	handleSectionDataChange,
	handleExplicitSectionDataChange,
}: JeffsFirstComponentCmsProps) => {
	const [isPreview, setIsPreview] = useState(false);
	if (isPreview)
		return (
			<>
				<button onClick={() => setIsPreview(false)}>Boop</button>
				<JeffsFirstComponent section={section} />
			</>
		);
	return (
		<div style={{ width: "100%" }}>
			<button onClick={() => setIsPreview(true)}>Boop</button>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<TextCmsBlock
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"sectionTitle"}
						value={section.sectionTitle}
					/>
				</Grid>
				<Grid item xs={12}>
					<DataFetchAutocompleteInput
						section={section}
						handleExplicitSectionDataChange={handleExplicitSectionDataChange}
						fieldName={"author"}
						value={section?.author}
					/>
					<ImageCmsBlock
						section={section}
						handleSectionDataChange={handleSectionDataChange}
						fieldName={"cardImage"}
						value={section.cardImage}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default JeffsFirstComponentCms;
