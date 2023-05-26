import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import RenderComponents from "../../components/__cms/RenderComponents";
import Button from "@mui/material/Button";

const Recipe = ({ recipeData }: any) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const recipe = recipeData?.data;
	console.log(recipeData);

	return (
		<div>
			{/* <div style={{ paddingTop: "100px" }}>{recipeData?.data?.recipe_name}</div>
			<div style={{ paddingTop: "10px" }}>{recipeData?.data?.recipe_description}</div> */}
			<RenderComponents cmsData={recipe?.cms_data} />
			{/* <Button onClick={() => router.back()}>Back</Button> */}
		</div>
	);
};

export default Recipe;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	// const paths = sampleUserData.map((user) => ({
	//   params: { id: user.id.toString() },
	// }))

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return {
		paths: [],
		fallback: true,
	};
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params)
		return {
			notFound: true,
		};

	const identifier = params.identifier;

	try {
		//Fetch Recipe Data
		const recipeReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/recipes/${identifier}`
		);

		const recipeData = await recipeReq.json();

		if (!recipeData.success) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				recipeData: recipeData,
			},
			// Next.js will attempt to re-generate the recipe:
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
