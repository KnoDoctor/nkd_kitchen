import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import useCategories from "../../../hooks/categories/useCategories";

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
	const [category, setCategory] = useState<any>(null);

	const categories = useCategories();

	const getCategoryData = async () => {
		if (fieldValue) {
			let res = await fetch(`/api/categories/${fieldValue}`);

			let data = await res.json();

			setCategory(data.data);
		} else {
			setCategory(null);
		}
	};

	useEffect(() => {
		getCategoryData();
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: fieldValue,
			},
			section
		);
	}, [fieldValue]);

	if (categories.isLoading) return <>Loading...</>;
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
							{category?.first_name} {category?.last_name}
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

						setFieldValue(newValue.category_id);
					} else {
						setFieldValue("");
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="category-autocomplete-field"
				options={categories.data.data}
				getOptionLabel={(category) => `${category.category_name}`}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for a category..."
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
