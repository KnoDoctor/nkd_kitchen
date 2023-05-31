//React & Material-UI Imports
import React from "react";

import useCategories from "../../../../hooks/categories/useCategories";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Element, isText } from "domhandler";

import { Box, Typography } from "@mui/material";

import parse, { attributesToProps } from "html-react-parser";

import CategoryCard from "../../../_molecules/__cards/CategoryCard";

//Import Scrollable Anchor
// import ScrollableAnchor from 'react-scrollable-anchor';

const categoryCardMockData = [
	{ title: "Quick and Easy Dinners", image: "/images/sample-images/ground-turkey-stir-fry.webp" },
	{ title: "Slow Cooker", image: "/images/sample-images/salmon-tacos.webp" },
	{ title: "Stir Fry", image: "/images/sample-images/sheet-pan-chicken-fajitas.webp" },
	{ title: "Mexican Recipes", image: "/images/sample-images/slow-cooker-pork-tenderloin.webp" },
];

interface CategorySectionProps {
	section: any;
	colorSettings: string;
	sectionBackgroundColor: string;
	sectionFontColor: string;
	sectionAnchor?: string;
}

interface SimplifiedCategory {
	category_id: string;
	category_name: string;
}

interface FullCategory {
	category_id: string;
	category_name: string;
	created_at: string;
	category_image: string;
	updated_at: string;
}

function getFullCategories(
	simplifiedCategories: SimplifiedCategory[],
	fullCategories: FullCategory[]
): FullCategory[] {
	if (simplifiedCategories.length === 0 || fullCategories.length === 0) {
		return []; // Return an empty array if either input array is empty
	}

	const categoryIds = simplifiedCategories.map((category) => category.category_id);

	return fullCategories.filter((category) => categoryIds.includes(category.category_id));
}

const CategorySection = ({
	section,
	colorSettings,
	sectionBackgroundColor,
	sectionFontColor,
	sectionAnchor,
}: CategorySectionProps) => {
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	const categories = useCategories();
	console.log(categories);

	if (categories.isLoading) {
		return <div>Loading...</div>;
	}
	console.log(getFullCategories(section.featuredCategories, categories.data.data));

	return section ? (
		// <ScrollableAnchor id={sectionAnchor ? sectionAnchor : 'section'}>
		<Box
			sx={{
				background: colorSettings === "Custom" ? sectionBackgroundColor : "none",
				my: 4,
			}}
		>
			<Box
				sx={{
					margin: "auto",
				}}
			>
				<Typography
					variant="h5"
					sx={{
						color: colorSettings === "Custom" ? sectionFontColor : "#494949",
						textAlign: "center",
					}}
				>
					{section.sectionHeadline}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						color: colorSettings === "Custom" ? sectionFontColor : "#494949",

						textAlign: "center",
					}}
				>
					{section.sectionContent &&
					section.sectionContent != "<p><br></p>" &&
					typeof section.sectionContent === "string" ? (
						parse(section.sectionContent, {
							trim: true,
							replace: (domNode) => {
								if (
									domNode instanceof Element &&
									domNode.attribs &&
									domNode.name === "a"
								) {
									const props = attributesToProps(domNode.attribs);
									const { target, ...remainingProps } = props;
									return (
										<a {...remainingProps}>
											{isText(domNode.children[0]) ? (
												domNode.children[0].data
											) : (
												<></>
											)}
										</a>
									);
								}
							},
						})
					) : (
						<></>
					)}
				</Typography>
			</Box>
			<Box
				sx={{
					maxWidth: "1200px",
					margin: "2rem auto",
					display: "flex",
					justifyContent: "center",
				}}
			>
				{getFullCategories(section.featuredCategories, categories.data.data).map(
					(category: any) => (
						<CategoryCard
							categoryName={category.category_name}
							imageUrl={category.category_image}
							categoryId={category.category_id}
						/>
					)
				)}
			</Box>
		</Box>
	) : (
		<></>
	);
};

export default CategorySection;
