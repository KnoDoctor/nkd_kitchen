import { useEffect } from "react";
import { useRouter } from "next/router";

import parse from "html-react-parser";

import Toolbar from "@mui/material/Toolbar/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import HeroBanner from "../../components/cells/HeroBanner";
import About from "../../components/cells/About";
import Image from "next/image";
import Divider from "@mui/material/Divider";

import { motion } from "framer-motion";
import SlideIn from "../../components/_atoms/SlideIn";

import useProject from "../../hooks/projects/useProject";

const Project = ({ projectData }: any) => {
	const router = useRouter();

	const slides = [
		{
			heroBannerType: "image",
			imageUrl:
				"https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
			contentAlignment: "center",
			textColor: "#fff",
			title: `Project ${router.query.identifer}`,
			subtitle: "Where the project case study will live",
			// buttonText: "Learn More",
			// buttonLink: "/",
			// buttonColor: "#194666",
			// buttonTextColor: "#fff",
		},
	];
	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}
	return (
		<Container
			maxWidth={"md"}
			sx={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				py: { xs: 12, md: 15 },
			}}
		>
			<SlideIn>
				<Box
					sx={{
						position: "relative",
						width: { xs: "100%", md: "400px" },
						height: "300px",
						margin: "auto",
						mb: 5,
					}}
				>
					<Image
						src={
							projectData?.data?.project_hero_image ||
							"https://images.unsplash.com/photo-1473343775075-61805b64e5d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
						}
						fill={true}
						alt="test123"
						style={{ objectFit: "cover", borderRadius: "25px" }}
					/>
				</Box>
			</SlideIn>
			<SlideIn delaySlideIn={0.1}>
				<Typography variant="h2" component="h1" textAlign={"center"} gutterBottom>
					{projectData?.data?.project_name}
				</Typography>
			</SlideIn>
			<SlideIn delaySlideIn={0.2}>
				<Typography variant="h5" component="h2" textAlign={"center"}>
					{projectData?.data?.project_description}
				</Typography>
			</SlideIn>
			<SlideIn delaySlideIn={0.3}>
				{
					<Box id={`ckeditor_content`}>
						{typeof projectData?.data?.project_data === "string"
							? parse(projectData?.data?.project_data)
							: "Parse Error"}
					</Box>
				}
			</SlideIn>
			{/* <Divider sx={{ my: 3 }} />
                <Typography variant="h4" component="h3">
                    Contents
                </Typography>
                <ul>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#the-goal">The Goal</a>
                    </li>
                    <li>
                        <a href="#challenges">Challenges</a>
                    </li>
                    <li>
                        <a href="#strategy-solution">Strategy + Solution</a>
                    </li>
                    <li>
                        <a href="#final-product">Final Product</a>
                    </li>
                    <li>
                        <a href="#conclusion">Conclusion</a>
                    </li>
                </ul> */}
			{/* <Divider sx={{ my: 3 }} />
                <Typography variant="h5" component="h3" id={"about"} mb={3}>
                    About
                </Typography>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                </Typography> */}
			{/* <SlideIn delaySlideIn={0.3}>
				<>
					<Divider sx={{ my: 3 }} />
					<Typography variant="h5" component="h3" id={"the-goal"} mb={3}>
						Objectives
					</Typography>
					<Typography variant="body1">To be successful the project needed to:</Typography>
					<ul>
						<li>This is a place to list objectives</li>
						<li>Another project object could be listed here</li>
						<li>You could even write a slightly longer objective to go here</li>
					</ul>
					<Typography variant="body1">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor repellat eum
						porro, dolores dolorem praesentium modi quaerat voluptatem neque doloremque
						omnis asperiores, molestias, maiores suscipit tenetur ipsam alias esse
						maxime!
					</Typography>
				</>
			</SlideIn> */}
			{/* <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    component="h3"
                    id={"challenges"}
                    mb={3}
                >
                    Challenges
                </Typography>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography>
                <Grid container spacing={3} mb={2}>
                    <Grid item xs={4} sx={{ height: 300 }}>
                        <Box
                            sx={{
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <Image
                                src="https://picsum.photos/600/800?random=2"
                                fill={true}
                                alt="test"
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ height: 300 }}>
                        <Box
                            sx={{
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <Image
                                src="https://picsum.photos/600/800?random=3"
                                fill={true}
                                alt="test"
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ height: 300 }}>
                        <Box
                            sx={{
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <Image
                                src="https://picsum.photos/600/800?random=4"
                                fill={true}
                                alt="test"
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography>
                <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    sit necessitatibus quibusdam, fuga eligendi placeat vero
                    fugiat praesentium cum magni repellat dolorem voluptate
                    facere distinctio animi, repellendus rem tenetur mollitia.
                </Typography> */}
			{/* <SlideIn delaySlideIn={0.4}>
				<>
					<Divider sx={{ my: 3 }} />
					<Typography variant="h5" component="h3" id={"strategy-solution"} mb={3}>
						Strategy + Solution
					</Typography>
					<Typography variant="body1" mb={2}>
						The primary challenges of this project were ensuring that the taps were
						strong enough to stand up to daily use in the bar. This was resolved by
						integrating a threaded metal rod and coupling nut to the inside of the print
						to provide a solid core to the taps.
					</Typography>
					<Typography variant="body1" mb={2}>
						Pulling from the icon mascot of the Beamish House, the goat brew was given a
						matching tap which places the Beamish white goat front and centre. For the
						Beamish House brew a model of the Beamish building was used at the head of
						the tap. In both cases the Icon Beamish House Pub text runs down the base of
						the tap.
					</Typography>

					<Grid container spacing={3}>
						<Grid item xs={12} md={6} sx={{ height: 600 }}>
							<Box
								sx={{
									position: "relative",
									height: "100%",
								}}
							>
								<Image
									src="/images/beamish-taps/tap_1_expanded.jpg"
									fill={true}
									alt="test"
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} sx={{ height: 600 }}>
							<Box
								sx={{
									position: "relative",
									height: "100%",
								}}
							>
								<Image
									src="/images/beamish-taps/tap_2_expanded.jpg"
									fill={true}
									alt="test"
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
					</Grid>
					<Typography variant="body1" mb={2}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor repellat eum
						porro, dolores dolorem praesentium modi quaerat voluptatem neque doloremque
						omnis asperiores, molestias, maiores suscipit tenetur ipsam alias esse
						maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit
						necessitatibus quibusdam, fuga eligendi placeat vero fugiat praesentium cum
						magni repellat dolorem voluptate facere distinctio animi, repellendus rem
						tenetur mollitia.
					</Typography>
				</>
			</SlideIn>
			<SlideIn delaySlideIn={0.5}>
				<>
					<Divider sx={{ my: 3 }} />
					<Typography variant="h5" component="h3" id={"final-product"} mb={3}>
						Final Product
					</Typography>
					<Typography variant="body1" mb={2}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor repellat eum
						porro, dolores dolorem praesentium modi quaerat voluptatem neque doloremque
						omnis asperiores, molestias, maiores suscipit tenetur ipsam alias esse
						maxime!
					</Typography>
					<Grid container spacing={3} mb={2}>
						<Grid item xs={12} md={6} sx={{ height: 400 }}>
							<Box
								sx={{
									position: "relative",
									height: "100%",
								}}
							>
								<Image
									src="https://picsum.photos/600/800?random=7"
									fill={true}
									alt="test"
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} sx={{ height: 400 }}>
							<Box
								sx={{
									position: "relative",
									height: "100%",
								}}
							>
								<Image
									src="https://picsum.photos/600/800?random=8"
									fill={true}
									alt="test"
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
					</Grid>
					<Typography variant="body1" mb={2}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor repellat eum
						porro, dolores dolorem praesentium modi quaerat voluptatem neque doloremque
						omnis asperiores, molestias, maiores suscipit tenetur ipsam alias esse
						maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit
						necessitatibus quibusdam, fuga eligendi placeat vero fugiat praesentium cum
						magni repellat dolorem voluptate facere distinctio animi, repellendus rem
						tenetur mollitia.
					</Typography>
					<Typography variant="body1" mb={2}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor repellat eum
						porro, dolores dolorem praesentium modi quaerat voluptatem neque doloremque
						omnis asperiores, molestias, maiores suscipit tenetur ipsam alias esse
						maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit
						necessitatibus quibusdam, fuga eligendi placeat vero fugiat praesentium cum
						magni repellat dolorem voluptate facere distinctio animi, repellendus rem
						tenetur mollitia.
					</Typography>
				</>
			</SlideIn> */}
			{/* <Divider sx={{ my: 3 }} />
                <Typography
                variant="h5"
                    component="h3"
                    id={"conclusion"}
                    mb={3}
                    >
                    Conclusion
                    </Typography>
                    <Typography variant="body1" mb={2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor repellat eum porro, dolores dolorem praesentium modi
                    quaerat voluptatem neque doloremque omnis asperiores,
                    molestias, maiores suscipit tenetur ipsam alias esse maxime!
                </Typography> */}
		</Container>
	);
};

export async function getStaticPaths() {
	return {
		paths: [
			{
				params: {
					identifier: "9eebd3bf-bb50-4c08-91f8-81b69bf5bdc6",
				},
			},
		],
		fallback: true,
	};
}

export async function getStaticProps({ params }: any) {
	try {
		//Fetch collection data
		const projectReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/projects/${params.identifier}`
		);

		const projectData = await projectReq.json();

		if (!projectData.success) {
			console.log(projectData);
			return {
				notFound: true,
			};
		}

		return {
			props: {
				projectData,
			},
			// Next.js will attempt to re-generate the page:
			// - When a request comes in
			// - At most once every second
			revalidate: 5, // In seconds
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
}

export default Project;
