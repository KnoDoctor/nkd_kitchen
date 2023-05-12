import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import usePeople from "../../../hooks/people/usePeople";
import usePerson from "../../../hooks/people/usePerson";

interface DataFetchAutocompleteInputProps {
	value: string;
	fieldName: string;
	handleExplicitSectionDataChange: any;
	section: any;
}

export default function DataFetchAutocompleteInput({
	value,
	fieldName,
	handleExplicitSectionDataChange,
	section,
}: DataFetchAutocompleteInputProps) {
	const [fieldValue, setFieldValue] = useState(value ? value : "");
	const [inputValue, setInputValue] = useState("");
	const [person, setPerson] = useState<any>(null);

	const people = usePeople();

	const getPersonData = async () => {
		if (fieldValue) {
			let res = await fetch(`/api/people/${fieldValue}`);

			let data = await res.json();

			setPerson(data.data);
		} else {
			setPerson(null);
		}
	};

	useEffect(() => {
		getPersonData();
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: fieldValue,
			},
			section
		);
	}, [fieldValue]);

	if (people.isLoading) return <>Loading...</>;
	return (
		<div>
			<h4>{fieldName}</h4>
			{/* <div>{`value: ${fieldValue !== null ? `'${fieldValue}'` : "null"}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div> */}

			{fieldValue ? (
				<div>
					<div
						style={{
							zIndex: "0",
							position: "relative",
							margin: "auto",
						}}
					></div>
					<div style={{ textAlign: "center" }}>
						<h3>
							{person?.first_name} {person?.last_name}
							<IconButton
								onClick={() => {
									setFieldValue("");
									setInputValue("");
								}}
								aria-label="clear"
							>
								<ClearIcon fontSize="small" />
							</IconButton>
						</h3>
					</div>
				</div>
			) : (
				<></>
			)}
			<Autocomplete
				onChange={(event, newValue: any) => {
					if (newValue) {
						console.log("newValue: ", newValue);

						setFieldValue(newValue.person_id);
					} else {
						setFieldValue("");
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="person-autocomplete-field"
				options={people.data.data}
				getOptionLabel={(person) => `${person.first_name} ${person.last_name}`}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for someone..."
						variant="outlined"
						inputProps={{
							...params.inputProps,
							autoComplete: "new-password", // disable autocomplete and autofill
						}}
					/>
				)}
			/>
		</div>
	);
}
