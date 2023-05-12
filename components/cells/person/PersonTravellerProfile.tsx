import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PersonTravellerProfile = ({ person }: any) => {
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

	const bikingDetails = [
		{ label: `Preferred Bike Type`, value: `Flat Handlebar` },
		{ label: `Mirror`, value: `Yes` },
		{ label: `Helmet Size`, value: `Adult XL` },
		{ label: `Pedals`, value: `With Toe Cages` },
		{ label: `Seat Cover`, value: `Yes` },
		{ label: `Bike Jersey Size`, value: `Men's XL` },
	];

	const healthDiet = [
		{ label: `Diertary Preferences`, value: `None` },
		{ label: `Allergies`, value: `None` },
		{ label: `Medical Conditions`, value: `None` },
	];

	return (
		<Grid container spacing={5}>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">PASSPORT</Typography>
				<Grid container>
					{passport.map((field: any) => {
						return (
							<>
								<Grid item xs={6}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">GENERAL INFORMATION</Typography>
				<Grid container>
					{generalInfo.map((field: any) => {
						return (
							<>
								<Grid item xs={6}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">BIKING DETAILS</Typography>
				<Grid container>
					{bikingDetails.map((field: any) => {
						return (
							<>
								<Grid item xs={6}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="body1">{field.value}</Typography>
								</Grid>
							</>
						);
					})}
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6}>
				<Typography variant="h6">HEALTH & DIET</Typography>
				<Grid container>
					{healthDiet.map((field: any) => {
						return (
							<>
								<Grid item xs={6}>
									<Typography variant="body1">
										<strong>{field.label}:</strong>
									</Typography>
								</Grid>
								<Grid item xs={6}>
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

export default PersonTravellerProfile;
