import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SlideIn from "../_atoms/SlideIn";

import PortfolioCard from "../_molecules/projects/PortfolioCard";

import useProjects from "../../hooks/projects/useProjects";

const projects = [
	{
		project_name: "Beamish Beer Taps",
		project_description:
			"Custom beer taps draw inspiration from the restaurants beloved history to showcase there house beers.",
		project_hero_image: "/images/beamish-taps/tap_1.jpg",
	},
	{
		project_name: "Cookie Cutter",
		project_description:
			"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		project_hero_image:
			"https://images.unsplash.com/photo-1509460181860-1f17dd8cb0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
	},
	{
		project_name: "Neon One",
		project_description:
			"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		project_hero_image:
			"https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	},
	{
		project_name: "Neon Sign Two",
		project_description:
			"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		project_hero_image:
			"https://images.unsplash.com/photo-1550424844-f7b914439c1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	},
	{
		project_name: "Beer Tap",
		project_description:
			"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		project_hero_image:
			"https://images.unsplash.com/photo-1620219365994-f443a86ea626?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
	},
	{
		project_name: "Flower Pot",
		project_description:
			"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		project_hero_image:
			"https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
	},
];

const Portfolio = () => {
	const projects = useProjects();

	if (projects.isLoading) {
		return <div>Loading</div>;
	}
	return (
		<Container
			maxWidth={"xl"}
			sx={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				py: 12,
				// height: { xs: null, md: "100vh" },
			}}
		>
			<SlideIn>
				<>
					<Typography variant="h2" component="h3" sx={{ textAlign: "center", mb: 5 }}>
						Projects
					</Typography>
					<Grid container spacing={4}>
						{projects.data.data
							.filter((project: any) => project.is_published === true)
							.map((project: any, i: number) => {
								return (
									<Grid item xs={12} sm={6} md={4}>
										<PortfolioCard project={project} i={i} />
									</Grid>
								);
							})}
					</Grid>
				</>
			</SlideIn>
		</Container>
	);
};

export default Portfolio;
