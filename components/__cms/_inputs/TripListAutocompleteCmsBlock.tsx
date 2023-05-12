import React, { useState, useEffect } from "react";

import { Button, IconButton, TextField, Skeleton, Autocomplete } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// import { api } from "../../../../api/api";
import { useDebounce } from "use-debounce";

//Import Helper Functions
import { getUnique } from "../../../utils/helperFunctions";

interface TripListAutocompleteCmsBlockProps {
	deleteTripId: any;
	updateTripId: any;
	trip: any;
}

const TripListAutocompleteCmsBlock = ({
	deleteTripId,
	updateTripId,
	trip,
}: TripListAutocompleteCmsBlockProps) => {
	const [tripId, setTripId] = useState(trip.tripId ? trip.tripId : null);
	const [inputValue, setInputValue] = useState("");
	const [currentTrip, setCurrentTrip] = useState<any>(null);
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
		if (tripId) {
			setIsLoading(true);

			try {
				const tripReq = await fetch(
					`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/trips/${tripId}`
				);
				const tripData = await tripReq.json();
				setCurrentTrip(tripData.trip);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				return {
					notFound: true,
				};
			}

			// api(process.env.NEXT_PUBLIC_API_ENDPOINT + `/v1/trips/${tripId}`)
			// 	.then((trip) => {
			// 		setCurrentTrip(trip.trip);
			// 		setIsLoading(false);
			// 	})
			// 	.catch((err) => {
			// 		//Do Something
			// 		console.log(err.Error);
			// 		setIsLoading(false);
			// 	});
		} else {
			setCurrentTrip(null);
			setIsLoading(false);
		}
	};

	//Fetch Data
	useEffect(() => {
		getSearchResultsData();
	}, [debouncedInputValue]);

	useEffect(() => {
		getTripData();
	}, [tripId]);

	return (
		<div
			style={{
				borderBottom: "1px solid #e3e3e3",
				marginBottom: 45,
				padding: "20px 0px 0px 0px",
			}}
		>
			{isLoading ? (
				<>
					<Skeleton variant="rectangular" width={400} height={300} />
					<p>Loading trip...</p>
				</>
			) : currentTrip ? (
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
							src={currentTrip.cms_hero_banner}
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
							{currentTrip.p15_tripname}{" "}
							<IconButton
								onClick={() => {
									setTripId(null);
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
						updateTripId(trip.tripItemId, "tripId", newValue.p15_tripsid);
						setCurrentTrip(newValue);
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="tripId-autcomplete"
				options={getUnique(searchResults.trips, "p15_tripsid")}
				getOptionLabel={(currentTrip) => currentTrip.p15_tripname}
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
			<div style={{ textAlign: "right" }}>
				<Button
					onClick={() => {
						deleteTripId(trip.tripItemId);
					}}
					style={{
						background: "#194666",
						color: "#fff",
						marginTop: 20,
						marginBottom: 40,
					}}
				>
					Delete Trip
				</Button>
			</div>
		</div>
	);
};

export default TripListAutocompleteCmsBlock;
