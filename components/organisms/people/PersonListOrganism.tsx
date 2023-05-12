import React from "react";
import { useRouter } from "next/router";

import { Card, Grid } from "@mui/material";

import ButtonBase from "@mui/material/ButtonBase";

import Link from "../../../src/Link";
import Breadcrumbs from "../../_molecules/Breadcrumbs";

import PersonCreatationOrganism from "./PersonCreatationOrganism";

import { returnCurrentModule } from "../../../utils/helperFunctions";
import usePeople from "../../../hooks/people/usePeople";
import PersonProfileCard from "../../_molecules/people/PersonProfileCard";

const PersonListOrganism = () => {
	const people = usePeople();
	const router = useRouter();

	if (people.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: returnCurrentModule(router),
						anchor: `/admin/${returnCurrentModule(router)}`,
					},
					{ label: "People", anchor: null },
				]}
				actions={[
					{
						label: "Add New Person",
						component: <PersonCreatationOrganism />,
					},
				]}
			/>
			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					{people.data.data.map((person: any) => (
						<Grid item xs={12} sm={6} md={3}>
							<PersonProfileCard
								firstname={person.first_name}
								lastname={person.last_name}
								viewProfileUrl={`/admin/${returnCurrentModule(router)}/people/${
									person.person_id
								}`}
							/>
							{/* <Link
								href={`/admin/${returnCurrentModule(router)}/people/${
									person.person_id
								}`}
							>
								<ButtonBase sx={{ width: "100%" }}>
									<Card
										variant={"outlined"}
										sx={{ p: 3, width: "100%", background: "#fafafa" }}
									>
										{person.first_name}
										{` `}
										{person.last_name}
									</Card>
								</ButtonBase>
							</Link> */}
						</Grid>
					))}
				</Grid>
			</Card>
		</>
	);
};

export default PersonListOrganism;
