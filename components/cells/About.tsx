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
					About n_k_d Kitchen
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
									src="/images/sample-images/8806914143_a750ced2cb.jpg"
									alt="profile"
									fill={true}
									style={{ objectFit: "cover", objectPosition: "top" }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={7}>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								Introducing N_K_D Kitchen, a vibrant and interactive online platform
								dedicated to connecting passionate food enthusiasts and culinary
								aficionados from around the world. Our recipe sharing website serves
								as a digital hub where individuals can discover, create, and share
								their favorite recipes, fostering a global community united by their
								love for cooking and gastronomy.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								At N_K_D Kitchen, we believe that cooking is an art form that
								transcends boundaries, cultures, and skill levels. Whether you're an
								experienced chef or a kitchen novice, our platform welcomes everyone
								to explore a diverse collection of recipes spanning various
								cuisines, dietary preferences, and cooking techniques. From
								mouthwatering mains and delectable desserts to refreshing beverages
								and innovative appetizers, there's something for every palate.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								As a member of our community, you can unleash your culinary
								creativity by contributing your own recipes, complete with
								step-by-step instructions, ingredient lists, and captivating food
								photography. Our user-friendly interface and intuitive recipe editor
								make it easy for you to showcase your culinary creations and engage
								with other passionate food lovers.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								Connect with fellow food enthusiasts through vibrant discussions,
								comments, and ratings. Discover hidden gems and personal favorites
								shared by others, and share your cooking experiences, tips, and
								tricks. Expand your culinary repertoire by browsing through curated
								collections, seasonal inspirations, and trending recipes tailored to
								your preferences.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								We value the importance of dietary diversity and inclusivity, so
								you'll find a wide array of recipes catering to various dietary
								needs, such as vegetarian, vegan, gluten-free, and more. Our search
								filters and personalized recommendations ensure that you can easily
								find recipes that align with your specific requirements.
							</Typography>
							<Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
								Embrace the joy of cooking with N_K_D Kitchen, your go-to
								destination for culinary exploration, inspiration, and connection.
								Join our growing community today and embark on a flavorful journey,
								celebrating the art of cooking, one recipe at a time.
							</Typography>
						</Grid>
					</Grid>
				</Card>
			</SlideIn>
		</Container>
	);
};

export default About;
