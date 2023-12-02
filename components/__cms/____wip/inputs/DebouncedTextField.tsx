import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useDebounce } from "use-debounce";

//Import Material-UI Components
import TextField from "@mui/material/TextField";

interface DebouncedTextFieldProps {
	// fieldName: string;
	value: string;
	placeholder?: string;
	// id?: any;
	setValue(value: string): void;
	// ref: any;
	// updateField?(id: any, fieldName: string, value: string): void;
}

const DebouncedTextField = forwardRef(
	({ value, setValue, placeholder }: DebouncedTextFieldProps, ref: any) => {
		const inputRef = useRef(null);
		useImperativeHandle(
			ref,
			() => ({
				focus: () => {
					if (inputRef.current) {
						(inputRef.current as HTMLInputElement).focus();
					}
				},
			}),
			[]
		);
		const [textFieldValue, setTextFieldValue] = useState(value);

		//Set debounced text value
		const [debouncedTextFieldValue] = useDebounce(textFieldValue, 500);

		useEffect(() => {
			if (setValue) {
				setValue(debouncedTextFieldValue);
			}
		}, [debouncedTextFieldValue]);

		return (
			<TextField
				inputRef={inputRef}
				// multiline
				variant="standard"
				// id={fieldName}
				// name={fieldName}
				value={textFieldValue}
				placeholder={placeholder}
				onChange={(event) => {
					setTextFieldValue(event.target.value);
				}}
				style={{ width: "100%", marginBottom: 20 }}
			/>
		);
	}
);

export default DebouncedTextField;
