import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

//Import Material-UI Components
import { TextField } from "@mui/material";

interface TextCmsBlockProps {
	section: any;
	fieldName: string;
	value: string;
	handleExplicitSectionDataChange: any;
}

const TextCmsBlock = ({
	section,
	fieldName,
	value,
	handleExplicitSectionDataChange,
}: TextCmsBlockProps) => {
	const [textFieldValue, setTextFieldValue] = useState(value);

	//Set debounced text value
	const [debouncedTextFieldValue] = useDebounce(textFieldValue, 600);
	useEffect(() => {
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: debouncedTextFieldValue,
			},
			section
		);
	}, [debouncedTextFieldValue]);

	return (
		<div>
			<h4>{fieldName}</h4>
			<TextField
				fullWidth
				multiline
				variant="outlined"
				id={fieldName}
				label={fieldName}
				name={fieldName}
				value={textFieldValue}
				onChange={(event) => {
					setTextFieldValue(event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
		</div>
	);
};

export default TextCmsBlock;
