import React, { useState, useEffect } from "react";

import { IconButton, TextField, Skeleton, Autocomplete } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// import { api } from "../../../../api/api";
import { useDebounce } from "use-debounce";

//Import Helper Functions
import { getUnique } from "../../../utils/helperFunctions";

interface TripCtaTileAutocompleteCmsBlockProps {
	value: string;
	fieldName: string;
	handleExplicitSectionDataChange: any;
	section: any;
}

export default function TripCtaTileAutocompleteCmsBlock({
	value,
	fieldName,
	handleExplicitSectionDataChange,
	section,
}: TripCtaTileAutocompleteCmsBlockProps) {
	const [fieldValue, setFieldValue] = useState(value ? value : null);
	const [inputValue, setInputValue] = useState("");
	const [trip, setTrip] = useState<any>(null);
	const [searchResults, setSearchResults] = useState<any>({});
	const [isLoading, setIsLoading] = useState(true);

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

	const getTripData = async () => {
		if (fieldValue) {
			setIsLoading(true);

			try {
				const tripReq = await fetch(
					`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/trips/${fieldValue}`
				);
				const tripData = await tripReq.json();
				setTrip(tripData.trip);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				return {
					notFound: true,
				};
			}

			// api(process.env.NEXT_PUBLIC_API_ENDPOINT + `/v1/trips/${fieldValue}`)
			// 	.then((trip) => {
			// 		setTrip(trip.trip);
			// 		setIsLoading(false);
			// 	})
			// 	.catch((err) => {
			// 		//Do Something
			// 		console.log(err.Error);
			// 		setIsLoading(false);
			// 	});
		} else {
			setTrip(null);
			setIsLoading(false);
		}
	};

	//Fetch Data
	useEffect(() => {
		getSearchResultsData();
	}, [debouncedInputValue]);

	useEffect(() => {
		getTripData();
		handleExplicitSectionDataChange(
			{
				fieldName,
				value: fieldValue,
			},
			section
		);
	}, [fieldValue]);

	return (
		<div>
			<h4>{fieldName}</h4>
			{isLoading ? (
				<>
					<Skeleton variant="rectangular" width={400} height={300} />
					<p>Loading trip...</p>
				</>
			) : trip ? (
				<div>
					<div
						style={{
							zIndex: "0",
							position: "relative",
							width: "400px",
							height: "300px",
						}}
					>
						<img
							src={trip.cms_hero_banner}
							alt="hero-image"
							style={{
								objectFit: "cover",
								height: "100%",
								width: "100%",
							}}
						></img>
					</div>
					<div>
						<h3>
							{trip.p15_tripname}{" "}
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
						setFieldValue(newValue.p15_tripsid);
					} else {
						setFieldValue(null);
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="trip-cta-tile-autocomplete-field"
				options={getUnique(searchResults.trips, "p15_tripsid")}
				getOptionLabel={(trip) => trip.p15_tripname}
				// filterOptions={(trips, state) => trips}
				renderInput={(params) => (
					<TextField
						{...params}
						style={{ width: "100%" }}
						label="Search for a trip..."
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
