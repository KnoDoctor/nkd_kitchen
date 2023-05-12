import Image from "next/image";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SlideIn from "../_atoms/SlideIn";

const About = () => {
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
				<Typography variant="h2" component="h3" sx={{ textAlign: "center", mb: 5 }}>
					About Me
				</Typography>
			</SlideIn>
			<SlideIn delaySlideIn={0.1}>
				<Card sx={{ width: "100%", py: 5 }} raised>
					<Grid container spacing={5} sx={{ px: 5 }}>
						<Grid item xs={12} md={5}>
							<Box
								sx={{
									width: "100%",
									height: { xs: "450px", sm: "600px", md: "100%" },
									position: "relative",
									margin: "auto",
								}}
							>
								<Image
									src="/images/profile_pic.jpg"
									alt="profile"
									fill={true}
									style={{ objectFit: "cover", objectPosition: "top" }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={7}>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								I'm Andrew Barfield, and I'm located in Toronto, Canada. I have a
								passion for design and manufacturing using the latest in maker
								technology, and I've been honing my skills in this area for several
								years. I have a university degree in history from McMaster
								University, which has taught me to think critically and creatively.
								These skills have been invaluable in my journey as a maker, as I've
								been able to bring unique and functional designs to life using
								technologies such as 3D printing and vacuum forming.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								During the pandemic, I discovered the world of maker technology and
								became fascinated by the endless possibilities it presents. I began
								experimenting with 3D printing and soon realised that I had a real
								talent for creating functional and unique objects. However, I didn't
								stop there. I expanded my skill set to include vacuum forming and
								other technologies, which has given me the ability to bring even
								more complex and innovative designs to life.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								My approach to making is to think holistically about how to design
								an object that maximises the potential of the technology being used.
								I've worked on a variety of projects, from beer taps and cookie
								cutters to faux neon signs, trophies, and custom gummy candies. I
								believe that maker technology has the power to revolutionise the way
								we live and work, and I'm dedicated to playing my part in making
								that happen.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								My future goals include continuing to learn and explore new maker
								technologies, and using my skills to create interesting and exciting
								products and objects for consumers and clients. I'm always looking
								for new challenges and opportunities to grow and expand my skill
								set.
							</Typography>
						</Grid>
					</Grid>
				</Card>
			</SlideIn>
		</Container>
	);
};

export default About;
