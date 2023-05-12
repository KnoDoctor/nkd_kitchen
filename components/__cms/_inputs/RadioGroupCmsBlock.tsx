import React from "react";

import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

interface RadioGroupCmsBlockProps {
	fieldName: string;
	handleOptionChange: any;
	options: string[];
	name: string;
	value: string;
}

export default function RadioGroupCmsBlock({
	fieldName,
	handleOptionChange,
	options,
	name,
	value,
}: RadioGroupCmsBlockProps) {
	return (
		<FormControl component="fieldset">
			<RadioGroup
				aria-label={name}
				name={name}
				value={value}
				onChange={(event) => handleOptionChange(event)}
				style={{ flexDirection: "row" }}
			>
				{options.map((option) => {
					return <FormControlLabel value={option} control={<Radio />} label={option} />;
				})}
			</RadioGroup>
		</FormControl>
	);
}
