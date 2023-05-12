import React from "react";

import { useRouter } from "next/router";

import { Card, Grid } from "@mui/material";

import Breadcrumbs from "../../_molecules/Breadcrumbs";

import { returnCurrentModule } from "../../../utils/helperFunctions";
import PageListCard from "../../_molecules/pages/PageListCard";
import PageCreationOrganism from "./PageCreationOrganism";

import usePages from "../../../hooks/pages/usePages";

const PageListOrganism = () => {
	const router = useRouter();

	const pagesData = usePages();

	console.log(pagesData);

	if (pagesData.isLoading) {
		return <div>Loading...</div>;
	}

	const getHeroImage = (page: any) => {
		const heroBannerSection = page?.cms_data.filter(
			(pageSection: any) => pageSection.sectionName === "heroBannerImageVideoCarousel"
		);

		if (heroBannerSection.length > 0) {
			return heroBannerSection[0].heroBannerSlides[0].imageUrl;
		} else {
			return "https://images.unsplash.com/photo-1675127077743-f388e7e37924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
		}
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
						label: `Pages`,
						anchor: null,
					},
				]}
				actions={[
					{
						label: "Add New Page",
						component: <PageCreationOrganism />,
					},
				]}
			/>
			<Card sx={{ p: 2, my: 2 }}>
				<Grid container spacing={3}>
					{pagesData?.data?.data?.map((page: any) => (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<PageListCard
								title={page.page_name}
								link={`/admin/${returnCurrentModule(router)}/pages/${page.page_id}`}
								image={getHeroImage(page)}
							/>
						</Grid>
					))}
				</Grid>
			</Card>
		</div>
	);
};

export default PageListOrganism;
