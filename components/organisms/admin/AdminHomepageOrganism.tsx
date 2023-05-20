import { Card, Grid } from "@mui/material";
import { useSession } from "next-auth/react";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import TileListCard from "../../_molecules/__cards/TileListCard";

import getCustomGreeting from "../../../utils/helperFunctions/getCustomGreeting";
import sortByReferenceArray from "../../../utils/helperFunctions/sortByReferenceArray";

//////Update to useModules
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

const AdminHomepageOrganism = () => {
	const { data: session } = useSession();

	const modulesData = useModules();

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
						label: getCustomGreeting(session?.user?.name),
						anchor: null,
					},
				]}
				// actions={[
				// 	{
				// 		label: "Add New Page",
				// 		component: <PageCreationOrganism />,
				// 	},
				// ]}
			/>
			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					{sortByReferenceArray(modulesData?.data?.data, sortingArr, "module_name").map(
						(module: any) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<TileListCard
									title={module.module_name}
									link={`/admin/${module.module_slug}`}
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

export default AdminHomepageOrganism;
