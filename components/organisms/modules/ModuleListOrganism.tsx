import { useRouter } from "next/router";

import { Card, Grid } from "@mui/material";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import { returnCurrentModule } from "../../../utils/helperFunctions";
import sortByReferenceArray from "../../../utils/helperFunctions/sortByReferenceArray";
import ModuleListCard from "../../_molecules/modules/ModuleListCard";
import ModuleCreationOrganism from "./ModuleCreationOrganism";

import useModules from "../../../hooks/modules/useModules";

const sortingArr: string[] = [
	"Marketing",
	"Sales",
	"Client Services",
	"Operations",
	"Loyalty",
	"Analytics",
	"Admin Settings",
];

const ModuleListOrganism = () => {
	const router = useRouter();

	const modulesData = useModules();

	console.log(modulesData);

	if (modulesData.isLoading) {
		return <div>Loading...</div>;
	}

	const getHeroImage = (module: any) => {
		if (module?.module_image) {
			return module.module_image;
		}
		return "https://images.unsplash.com/photo-1675127077743-f388e7e37924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
	};

	return (
		<div>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: returnCurrentModule(router),
						anchor: `/admin/${returnCurrentModule(router)}`,
					},
					{
						label: `Modules`,
						anchor: null,
					},
				]}
				actions={[
					{
						label: "Add New Module",
						component: <ModuleCreationOrganism />,
					},
				]}
			/>
			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					{sortByReferenceArray(modulesData?.data?.data, sortingArr, "module_name").map(
						(module: any) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<ModuleListCard
									title={module.module_name}
									link={`/admin/${returnCurrentModule(router)}/modules/${
										module.module_id
									}`}
									image={getHeroImage(module)}
								/>
							</Grid>
						)
					)}
				</Grid>
			</Card>
		</div>
	);
};

export default ModuleListOrganism;
