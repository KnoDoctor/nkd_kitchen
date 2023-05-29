import Image from "next/image";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactForm from "../_molecules/ContactForm";
import SlideIn from "../_atoms/SlideIn";

const Contact = () => {
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
					Contact
				</Typography>
			</SlideIn>
			<SlideIn delaySlideIn={0.1}>
				<Card sx={{ width: "100%", py: 5 }} raised>
					<Grid container spacing={5} sx={{ px: 5 }}>
						<Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" } }}>
							<Box
								sx={{
									height: { xs: "400px", md: "100%" },
									position: "relative",
									margin: "auto",
								}}
							>
								<Image
									src="/images/sample-images/image.jpg"
									alt="profile"
									fill={true}
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={7}>
							<ContactForm />
						</Grid>
					</Grid>
				</Card>
			</SlideIn>
		</Container>
	);
};

export default Contact;
