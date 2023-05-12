import React from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import ProfileCard from "../../_molecules/people/PersonProfileCard";
const PersonPersonalInformation = ({ person }: any) => {
	return (
		<Grid container>
			<Grid item xs={12} sm={6} md={6} lg={4}>
				<Typography variant="h6">LEGAL NAME</Typography>
				<Typography variant="body1">
					{person.data.data.first_name} {person.data.data.middlename}{" "}
					{person.data.data.last_name}
				</Typography>
				<Typography variant="h6">GENDER</Typography>
				<Typography variant="body1">
					{person.data.data.firstname === "Sonia" ? "Female" : "Male"}
				</Typography>
				<Typography variant="h6">DATE OF BIRTH</Typography>
				<Typography variant="body1">
					{person.data.data.birthdate && person.data.data.birthdate.split("T")[0]}
				</Typography>
				<Typography variant="h6">PHONE NUMBER</Typography>
				<Typography variant="body1">{person.data.data.mobilephone}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={6} lg={4}>
				<Typography variant="h6">ADDRESS</Typography>
				<Typography variant="body1">{person.data.data.address1_line1}</Typography>
				<Typography variant="body1">
					{`${person.data.data.address1_city}, ${person.data.data.address1_stateorprovince}, ${person.data.data.address1_country}`}
				</Typography>
				<Typography variant="body1">{person.data.data.address1_postalcode}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={6} lg={4}>
				<Typography variant="h6">EMERGENCY CONTACT</Typography>
				<Typography variant="body1">{person.data.data.p15_emergency1name}</Typography>
				<Typography variant="body1">
					{person.data.data.p15_emergency1mobilephone}
				</Typography>
				<Typography variant="body1">{person.data.data.p15_emergency1email}</Typography>
			</Grid>
		</Grid>
	);
};

export default PersonPersonalInformation;
