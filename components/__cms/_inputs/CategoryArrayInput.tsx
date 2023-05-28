import React, { useState, useEffect } from "react";

import { Box, TextField, Autocomplete, IconButton, Stack, Chip, Typography } from "@mui/material";
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
	const [selectedCategories, setSelectedCategories] = useState<
		{ category_id: string; category_name: string }[]
	>(section.featuredCategories);

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
				value: selectedCategories,
			},
			section
		);
	}, [selectedCategories]);

	const toggleCategory = (category: { category_id: string; category_name: string }) => {
		console.log(category);

		let currentSelectedCategories = [...selectedCategories];

		const categoryIndex = currentSelectedCategories.findIndex(
			(item) => item.category_id === category.category_id
		);

		if (categoryIndex !== -1) {
			currentSelectedCategories.splice(categoryIndex, 1);
		} else {
			currentSelectedCategories.push({
				category_id: category.category_id,
				category_name: category.category_name,
			});
		}

		setSelectedCategories(currentSelectedCategories);
	};

	if (categories.isLoading) return <>Loading...</>;
	return (
		<div>
			<h4>{fieldName}</h4>

			<Box my={2}>
				{selectedCategories.length > 0 ? (
					<Stack direction="row" spacing={1}>
						{selectedCategories.map((category) => (
							<Chip
								key={category.category_id}
								label={category.category_name}
								onDelete={() => {
									toggleCategory(category);
								}}
							/>
						))}
					</Stack>
				) : (
					<Typography variant="body1">
						No Featured Categories selected at this time.
					</Typography>
				)}
			</Box>

			<Autocomplete
				onChange={(event, newValue: any) => {
					if (newValue) {
						console.log("newValue: ", newValue);
						toggleCategory(newValue);
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
