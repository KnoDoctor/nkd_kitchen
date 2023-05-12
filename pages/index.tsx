import { useRouter } from "next/router";

import { GetStaticProps, GetStaticPaths } from "next";

import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ParticleBackground from "../components/__layouts/ParticleBackground";
import HeroBanner from "../components/cells/HeroBanner";
import Portfolio from "../components/cells/Portfolio";
import About from "../components/cells/About";
import Contact from "../components/cells/Contact";
import HomepageActionCard from "../components/_molecules/HomepageActionCard";
import PortfolioCard from "../components/_molecules/projects/PortfolioCard";
import SlideIn from "../components/_atoms/SlideIn";
import Logo from "../components/_atoms/Logo";

import RenderComponents from "../components/__cms/RenderComponents";

export default function Home({ pageData }: any) {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const page = pageData?.data;

	return (
		<>
			<RenderComponents cmsData={page?.cms_data} />

			{/* <HeroBanner
				slides={[
					{
						heroBannerType: "video",
						videoUrl: "https://youtu.be/KVIf0zuXro8",
						contentAlignment: "left",
						textColor: "#fff",
						title: "Contained",
						subtitle: "Inside A 2-Story Home Built Out of Shipping Containers",
						buttonText: "Read More",
						buttonLink: "/articles/first-article",
						buttonColor: "#194666",
						buttonTextColor: "#fff",
					},
					{
						heroBannerType: "video",
						videoUrl: "https://youtu.be/0Hj5SRxR_Cw",
						contentAlignment: "left",
						textColor: "#fff",
						title: "Downsizing without the move",
						subtitle: "Living In A $35K Tiny Home In My Backyard In Atlanta",
						buttonText: "Read More",
						buttonLink: "/",
						buttonColor: "#194666",
						buttonTextColor: "#fff",
					},
					{
						heroBannerType: "video",
						videoUrl: "https://youtu.be/fkVfX2hUlc8",
						contentAlignment: "left",
						textColor: "#fff",
						title: "Building Our House Under $5,000",
						subtitle: "A 120 Day Timelapse",
						buttonText: "Read More",
						buttonLink: "/",
						buttonColor: "#194666",
						buttonTextColor: "#fff",
					},
					{
						heroBannerType: "image",
						imageUrl:
							"https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80",
						contentAlignment: "right",
						textColor: "#fff",
						title: "Winter's around the Corner",
						subtitle: "5 Strategies to Keep Your Tiny Home Warm",
						buttonText: "Read More",
						buttonLink: "/",
						buttonColor: "#194666",
						buttonTextColor: "#fff",
					},
				]}
			/>
			<Box
				// style={{
				// 	width: "60%",
				// 	// height: "100vh",
				// 	display: "flex",
				// 	flexDirection: "column",
				// 	justifyContent: "center",
				// 	alignItems: "center",
				// 	margin: "auto",
				// }}
				sx={{
					width: "80%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					py: 12,
					margin: "auto",
					alignItems: "center",
					maxWidth: "1000px",
					minHeight: "100vh",
				}}
			>
				<SlideIn>
					<Box
						sx={{
							mb: { xs: 5, md: 10 },
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Logo />
					</Box>
				</SlideIn>
				<SlideIn>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={4}>
							<HomepageActionCard
								label="Projects"
								anchor="/projects"
								project={{
									name: "Projects",
									image: "https://images.unsplash.com/photo-1563520239648-a24e51d4b570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
								}}
								i={1}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<HomepageActionCard
								label="About Me"
								anchor="/about"
								project={{
									name: "About",
									image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
								}}
								i={2}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<HomepageActionCard
								label="Contact"
								anchor="/contact"
								project={{
									name: "Contact",
									image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
								}}
								i={3}
							/>
						</Grid>
					</Grid>
				</SlideIn>
				<Copyright />
			</Box>
			{/* <Portfolio />
            <About />
            <Contact />
            <ProTip /> */}

			{/*<ParticleBackground /> */}
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
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/pages/02d9547b-fed8-4602-9851-144712b8916c`
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
