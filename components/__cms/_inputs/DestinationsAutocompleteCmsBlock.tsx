import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// import { api } from "../../../../api/api";
import { useDebounce } from "use-debounce";

interface DestinationsAutocompleteCmsBlockProps {
	value: string;
	fieldName: string;
	handleExplicitInputChange: any;
}

const renderDestinationType = (destinationType: any) => {
	switch (destinationType) {
		case 1:
			return "Continent";
		case 3:
			return "Country";
		case 4:
			return "Region";
		case 5:
			return "City";
		default:
			return `Unknown destination type of ${destinationType}`;
	}
};

const DestinationsAutocompleteCmsBlock = ({
	value,
	fieldName,
	handleExplicitInputChange,
}: DestinationsAutocompleteCmsBlockProps) => {
	const [fieldValue, setFieldValue] = useState(value ? value : null);
	const [inputValue, setInputValue] = useState("");
	const [searchResults, setSearchResults] = useState({
		trips: [],
		destinations: [],
		activities: [],
		pages: [],
	});
	const [destination, setDestination] = useState<any>(null);
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
			// 		console.log(err.Error);\
			// 	});
		}
	};

	const getDestinationData = async () => {
		if (fieldValue) {
			try {
				const destinationReq = await fetch(
					`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/destinations/${fieldValue}`
				);
				const destinationData = await destinationReq.json();
				setDestination(destinationData.destination);
			} catch (err) {
				console.log(err);
				return {
					notFound: true,
				};
			}

			// api(process.env.NEXT_PUBLIC_API_ENDPOINT + `/v1/destinations/${fieldValue}`)
			// 	.then((destination) => {
			// 		setDestination(destination.destination);
			// 	})
			// 	.catch((err) => {
			// 		//Do Something
			// 		console.log(err.Error);
			// 	});
		} else {
			setDestination(null);
		}
	};

	//Fetch Data
	useEffect(() => {
		getSearchResultsData();
	}, [debouncedInputValue]);

	useEffect(() => {
		getDestinationData();
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
			{destination ? (
				<div>
					<div style={{ textAlign: "center" }}>
						<h3>
							{destination.destinationname}{" "}
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
						setFieldValue(newValue.destinationid);
					} else {
						setFieldValue(null);
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="destination-autocomplete-field"
				options={searchResults.destinations}
				getOptionLabel={(destination) => destination.destinationname}
				renderOption={(destination: any) => {
					return (
						<>
							{renderDestinationType(destination.destinationtype)}:{" "}
							{destination.destinationname}
						</>
					);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for a destination..."
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

export default DestinationsAutocompleteCmsBlock;
