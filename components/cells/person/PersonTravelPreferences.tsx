import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PersonTravelPreferences = ({ person }: any) => {
	const passport = [
		{ label: `Name On Passport`, value: person.data.data.p15_nameonpassport },
		{ label: `Passport Number`, value: person.data.data.p15_passportnumber },
		{ label: `Place of Birth`, value: person.data.data.p15_placeofbirth },
		{ label: `Place of Issue`, value: person.data.data.p15_placeofissue },
		{
			label: `Issue Date`,
			value:
				person.data.data.p15_passportissued &&
				person.data.data.p15_passportissued.split("T")[0],
		},
		{
			label: `Expiry Date`,
			value:
				person.data.data.p15_passportexpires &&
				person.data.data.p15_passportexpires.split("T")[0],
		},
		{ label: `Nationality`, value: person.data.data.p15_passportnationality },
	];

	const generalInfo = [
		{ label: `Height`, value: `6'3"` },
		{ label: `Weight`, value: `190 lbs` },
		{ label: `T-Shirt Size`, value: `Medium` },
		{ label: `Shoe Size`, value: `Men's 11` },
	];

	const activities = [
		{
			label: `Feeling Active`,
			value: `Biking, Walking, Skiing, Scuba Diving, Hiking`,
		},
		{
			label: `Time to Relax`,
			value: `Golf, Art & Culture`,
		},
	];
	const destinations = [
		{
			label: `Coming Up`,
			value: `Amalfi Coast, Paris, Belize, Chile, Panama`,
		},
		{
			label: `Favourite Spots`,
			value: `Sri Lanka, Mexico, New York City`,
		},
	];

	const healthDiet = [
		{ label: `Diertary Preferences`, value: `None` },
		{ label: `Allergies`, value: `None` },
	];

	const accommadation = [
		{ label: `Bed Size`, value: `King` },
		{
			label: `Amenities`,
			value: `Pool, Restaurants on Site, Luxury Rooms, Close to the Action, Spa, Gym`,
		},
	];

	const activityLevel = [
		{ label: `Biking`, value: `3` },
		{
			label: `Walking and Hiking`,
			value: `4`,
		},
	];

	return (
		<Grid container spacing={5}>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">
					WHERE{" "}
					{person?.data?.contact?.firstname &&
						person?.data?.contact?.firstname.toUpperCase()}{" "}
					WANTS TO GO
				</Typography>
				<Grid container spacing={1}>
					{destinations.map((field: any) => {
						return (
							<>
								<Grid item xs={4}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">
					WHAT{" "}
					{person?.data?.contact?.firstname &&
						person?.data?.contact?.firstname.toUpperCase()}{" "}
					LIKES TO DO
				</Typography>
				<Grid container spacing={1}>
					{activities.map((field: any) => {
						return (
							<>
								<Grid item xs={4}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>

			<Grid item xs={12} lg={6}>
				<Typography variant="h6">ACCOMMADATION PREFERENCES</Typography>
				<Grid container spacing={1}>
					{accommadation.map((field: any) => {
						return (
							<>
								<Grid item xs={4}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">DINING PREFERENCES</Typography>
				<Grid container spacing={1}>
					{healthDiet.map((field: any) => {
						return (
							<>
								<Grid item xs={4}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">ACTIVITY LEVEL</Typography>
				<Grid container spacing={1}>
					{activityLevel.map((field: any) => {
						return (
							<>
								<Grid item xs={4}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PersonTravelPreferences;
