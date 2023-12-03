import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import useMediaQuery from "@mui/material/useMediaQuery";

import RenderComponents from "../../components/__cms/RenderComponents";
import Button from "@mui/material/Button";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Recipe = ({ recipeData }: any) => {
	const router = useRouter();
	const isSingleColumn = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

	console.log(isSingleColumn);

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const recipe = recipeData?.data;
	console.log(recipeData);

	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{ pt: "64px", height: isSingleColumn ? null : "100vh" }}
		>
			<Grid container sx={{ height: "100%" }}>
				<Grid item xs={12} md={6} height={"100%"}>
					<Grid container height={"100%"}>
						<Grid item xs={12} height={"100%"}>
							<Box
								width={"100%"}
								height={isSingleColumn ? "450px" : "100%"}
								position="relative"
							>
								<Image
									src={
										recipe?.recipe_image ||
										`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
									}
									alt="test"
									fill={true}
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ overflowY: isSingleColumn ? null : "scroll", height: "100%" }}
				>
					<Grid container>
						<Grid item xs={12}>
							<Box p={2} mt={4}>
								<Typography variant="h3" textAlign={"center"}>
									{recipe.recipe_name}
								</Typography>
							</Box>
							<Box p={2} maxWidth={"90%"} margin={"auto"}>
								<Typography variant="body1" textAlign={"justify"}>
									{recipe.recipe_description}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box p={2} maxWidth={"90%"} margin={"auto"}>
								<Typography variant="h4" mb={2}>
									Ingredients
								</Typography>
								<Grid container spacing={2}>
									{recipe.recipes_ingredients
										.sort((a: any, b: any) => {
											const dateA = new Date(a[`created_at`]);
											const dateB = new Date(b[`created_at`]);
											return dateA.getTime() - dateB.getTime(); // For ascending order
										})
										.map((ingredient: any) => (
											<Grid item xs={12}>
												<Grid container spacing={4}>
													{/* <Grid item xs={2}>
													<Box
													width={"100%"}
													height={"50px"}
													position="relative"
													>
													<Image
													src={
														ingredient.ingredients
														.ingredient_image ||
														recipe.recipe_image
													}
															alt="test"
															fill={true}
															style={{ objectFit: "cover" }}
															/>
															</Box>
														</Grid> */}
													<Grid item xs={1}></Grid>
													<Grid item xs={1}>
														<Typography
															variant="body1"
															textAlign={"left"}
														>
															{ingredient.quantity}
														</Typography>
													</Grid>
													<Grid item xs={3}>
														<Typography
															variant="body1"
															textAlign={"left"}
														>
															{ingredient.unit}
														</Typography>
													</Grid>
													<Grid item xs={4}>
														<Typography
															variant="body1"
															textAlign={"left"}
														>
															{ingredient.ingredients.ingredient_name}
														</Typography>
													</Grid>
													<Grid item xs={2}>
														<Typography
															variant="body1"
															textAlign={"left"}
														>
															{ingredient.preparation_method}
														</Typography>
													</Grid>
												</Grid>
												<Divider sx={{ mt: 2 }} />
											</Grid>
										))}
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12} mb={4}>
							<Box p={2} maxWidth={"90%"} margin={"auto"}>
								<Typography variant="h4" mb={2}>
									Instructions
								</Typography>
								<Grid container spacing={2}>
									{recipe.instructions.map((instruction: any, i: number) => (
										<>
											<Grid item xs={1}>
												{`${i + 1}. `}
											</Grid>
											<Grid item xs={11}>
												<Typography variant="body1" textAlign={"justify"}>
													{instruction.instruction}
												</Typography>
											</Grid>
										</>
									))}
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12} mb={4}>
							<RenderComponents cmsData={recipe?.cms_data} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
		// <div>
		// 	{/* <div style={{ paddingTop: "100px" }}>{recipeData?.data?.recipe_name}</div>
		// 	<div style={{ paddingTop: "10px" }}>{recipeData?.data?.recipe_description}</div> */}
		// 	<RenderComponents cmsData={recipe?.cms_data} />
		// 	{/* <Button onClick={() => router.back()}>Back</Button> */}
		// </div>
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
