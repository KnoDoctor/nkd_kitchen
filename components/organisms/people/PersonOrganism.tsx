import React from "react";

import { useRouter } from "next/router";

import { Grid, Card, Button } from "@mui/material";

import Breadcrumbs from "../../_molecules/Breadcrumbs";
import PersonTabs from "../../cells/person/PersonTabs";

import { returnCurrentModule } from "../../../utils/helperFunctions";

import usePerson from "../../../hooks/people/usePerson";
import { log } from "console";

const PersonOrganism = () => {
	const router = useRouter();

	let isReady = router.isReady;
	let id = router.query.identifier;

	const person = usePerson(id);

	if (person.isLoading || !isReady) {
		return <div>Loading</div>;
	}

	if (person.error) {
		return (
			<div>
				<h4>{person.error.message}</h4>
			</div>
		);
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: returnCurrentModule(router),
						anchor: `/admin/${returnCurrentModule(router)}`,
					},
					{
						label: "People",
						anchor: `/admin/${returnCurrentModule(router)}/people`,
					},
					{
						label: `${person.data.data.first_name} ${person.data.data.last_name}`,
						anchor: null,
					},
				]}
			/>

			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<PersonTabs person={person} />

						<Button
							variant="outlined"
							onClick={() => {
								router.back();
							}}
						>
							Back
						</Button>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default PersonOrganism;
