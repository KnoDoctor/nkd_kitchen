import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

//Import Material-UI Components
import TextField from "@mui/material/TextField";

interface TextFieldProp {
	fieldName: string;
	value: string;
	id?: any;
	setValue?(value: string): void;
	updateField?(id: any, fieldName: string, value: string): void;
}

const TextFieldCms = ({ fieldName, value, setValue, updateField, id }: TextFieldProp) => {
	const [textFieldValue, setTextFieldValue] = useState(value);

	//Set debounced text value
	const [debouncedTextFieldValue] = useDebounce(textFieldValue, 100);

	useEffect(() => {
		if (setValue) {
			setValue(debouncedTextFieldValue);
		}
		if (updateField) {
			updateField(id, fieldName, debouncedTextFieldValue);
		}
	}, [debouncedTextFieldValue]);

	return (
		<div>
			<TextField
				multiline
				variant="outlined"
				id={fieldName}
				name={fieldName}
				value={textFieldValue}
				placeholder={"Enter some text..."}
				onChange={(event) => {
					setTextFieldValue(event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
		</div>
	);
};

export default TextFieldCms;
