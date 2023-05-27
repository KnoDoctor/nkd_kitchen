import { useRouter } from "next/router";

import { GetStaticProps } from "next";

import Box from "@mui/material/Box";

import RenderComponents from "../components/__cms/RenderComponents";
import ArticleCard from "../components/_molecules/__cards/ArticleCard";
import CategoryCard from "../components/_molecules/__cards/CategoryCard";
import CardSlider from "../components/_molecules/__cards/CardSlider";

const categoryCardMockData = [
	{ title: "Quick and Easy Dinners", image: "/images/sample-images/ground-turkey-stir-fry.webp" },
	{ title: "Slow Cooker", image: "/images/sample-images/salmon-tacos.webp" },
	{ title: "Stir Fry", image: "/images/sample-images/sheet-pan-chicken-fajitas.webp" },
	{ title: "Mexican Recipes", image: "/images/sample-images/slow-cooker-pork-tenderloin.webp" },
];

export default function Home({ pageData }: any) {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const page = pageData?.data;

	return (
		<>
			<RenderComponents cmsData={page?.cms_data} />
			<Box
				sx={{
					maxWidth: "1200px",
					margin: "2rem auto",
					display: "flex",
					justifyContent: "center",
				}}
			>
				{categoryCardMockData.map((category) => (
					<CategoryCard categoryName={category.title} imageUrl={category.image} />
				))}
			</Box>
			{/* <div style={{ maxWidth: "100%", margin: "2rem auto" }}>
				<CardSlider
					slides={[
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
					]}
				/>
			</div> */}
		</>
	);
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async () => {
	try {
		//Fetch Page Data
		const pageReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/pages/6555bcef-0836-4e91-a9ed-3f5bcebfd266`
		);

		const pageData = await pageReq.json();

		if (!pageData.success) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				pageData: pageData,
			},
			// Next.js will attempt to re-generate the page:
			// - When a request comes in
			// - At most once every second
			revalidate: 30, // In seconds
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
};
