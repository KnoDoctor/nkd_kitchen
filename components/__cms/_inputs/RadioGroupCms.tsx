import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface RadioGroupCmsProps {
	options: any;
	name?: any;
	value: any;
	handleOptionChange(event: any): void;
}

export default function RadioGroupCms({
	options,
	name,
	value,
	handleOptionChange,
}: RadioGroupCmsProps) {
	return (
		<FormControl component="fieldset">
			<RadioGroup
				aria-label={name}
				name={name}
				value={value}
				onChange={(event) => handleOptionChange(event)}
				style={{ flexDirection: "row" }}
			>
				{options.map((option: any) => {
					return <FormControlLabel value={option} control={<Radio />} label={option} />;
				})}
			</RadioGroup>
		</FormControl>
	);
}
