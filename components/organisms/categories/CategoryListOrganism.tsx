import { useRouter } from "next/router";

import { Card, Grid } from "@mui/material";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import { returnCurrentModule } from "../../../utils/helperFunctions";
import CategoryListCard from "../../_molecules/categories/CategoryListCard";
import CategoryCreationOrganism from "./CategoryCreationOrganism";

import useCategories from "../../../hooks/categories/useCategories";

const CategoryListOrganism = () => {
	const router = useRouter();

	const categoriesData = useCategories();

	console.log(categoriesData);

	if (categoriesData.isLoading) {
		return <div>Loading...</div>;
	}

	const getHeroImage = (category: any) => {
		if (category?.category_image) {
			return category.category_image;
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
						label: `Categories`,
						anchor: null,
					},
				]}
				actions={[
					{
						label: "Add New Category",
						component: <CategoryCreationOrganism />,
					},
				]}
			/>
			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					{categoriesData?.data?.data?.map((category: any) => (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CategoryListCard
								title={category.category_name}
								link={`/admin/${returnCurrentModule(router)}/categories/${
									category.category_id
								}`}
								image={getHeroImage(category)}
							/>
						</Grid>
					))}
				</Grid>
			</Card>
		</div>
	);
};

export default CategoryListOrganism;
