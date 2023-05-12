import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";

import { useDebounce } from "use-debounce";

interface VideoCmsBlockProps {
	section: any;
	fieldName: string;
	value: string;
	handleExplicitSectionDataChange: any;
}

const VideoCmsBlock = ({
	section,
	fieldName,
	value,
	handleExplicitSectionDataChange,
}: VideoCmsBlockProps) => {
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
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				// fieldName={fieldName}
				name={fieldName}
				label={fieldName}
				value={textFieldValue}
				onChange={(event) => {
					setTextFieldValue(event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
		</div>
	);
};

export default VideoCmsBlock;
