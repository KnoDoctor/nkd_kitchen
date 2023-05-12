import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// import { api } from "../../../../api/api";
import { useDebounce } from "use-debounce";

interface ExperiencesAutocompleteCmsBlockProps {
	value: string;
	fieldName: string;
	handleExplicitInputChange: any;
}

const ExperiencesAutocompleteCmsBlock = ({
	value,
	fieldName,
	handleExplicitInputChange,
}: ExperiencesAutocompleteCmsBlockProps) => {
	const [fieldValue, setFieldValue] = useState(value ? value : null);
	const [inputValue, setInputValue] = useState("");
	const [searchResults, setSearchResults] = useState({
		trips: [],
		destinations: [],
		activities: [],
		pages: [],
	});
	const [experience, setExperience] = useState<any>(null);
	const [debouncedInputValue] = useDebounce(inputValue, 500);

	const getSearchResultsData = async () => {
		if (debouncedInputValue.length > 0) {
			//Set Search Results Fetch Object
			let searchResultsFetchObject = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					searchQuery: debouncedInputValue,
				}),
			};

			try {
				const searchReq = await fetch(
					`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/search`,
					searchResultsFetchObject
				);
				const searchData = await searchReq.json();
				setSearchResults(searchData);
			} catch (err) {
				console.log(err);
				return {
					notFound: true,
				};
			}

			// api(process.env.NEXT_PUBLIC_API_ENDPOINT + `/v1/search`, searchResultsFetchObject)
			// 	.then((searchResults) => {
			// 		setSearchResults(searchResults);
			// 	})
			// 	.catch((err) => {
			// 		//Do Something
			// 		console.log(err.Error);
			// 	});
		}
	};

	const getExperienceData = async () => {
		if (fieldValue) {
			try {
				const experienceReq = await fetch(
					`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/activities/${fieldValue}`
				);
				const experienceData = await experienceReq.json();
				setExperience(experienceData.activity);
			} catch (err) {
				console.log(err);
				return {
					notFound: true,
				};
			}

			// api(process.env.NEXT_PUBLIC_API_ENDPOINT + `/v1/activities/${fieldValue}`)
			// 	.then((experience) => {
			// 		setExperience(experience.activity);
			// 	})
			// 	.catch((err) => {
			// 		//Do Something
			// 		console.log(err.Error);
			// 	});
		} else {
			setExperience(null);
		}
	};

	//Fetch Data
	useEffect(() => {
		getSearchResultsData();
	}, [debouncedInputValue]);

	useEffect(() => {
		getExperienceData();
		handleExplicitInputChange({
			fieldName,
			value: fieldValue,
		});
	}, [fieldValue]);

	return (
		<div style={{ marginBottom: 40 }}>
			<h4 style={{ marginTop: 0 }}>{fieldName}</h4>
			{/* <div>{`value: ${
                fieldValue !== null ? `'${fieldValue}'` : "null"
            }`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
			{experience ? (
				<div>
					<div style={{ textAlign: "center" }}>
						<h3>
							{experience.p15_name}{" "}
							<IconButton
								onClick={() => {
									setFieldValue(null);
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
						setFieldValue(newValue.p15_tripactivitiesid);
					} else {
						setFieldValue(null);
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="experience-autocomplete-field"
				options={searchResults.activities}
				getOptionLabel={(experience) => experience.p15_name}
				renderOption={(experience: any) => experience.p15_name}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for an experience..."
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
};

export default ExperiencesAutocompleteCmsBlock;
