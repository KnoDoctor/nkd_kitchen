import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Link from "../../../components/_atoms/Link";
interface ListCardProps {
	name: string;
	user: string;
	image: string;
	link: string;
}

export default function ListCard({ name, user, image, link }: ListCardProps) {
	return (
		<Link href={link} sx={{ textDecoration: "none" }}>
			<Card sx={{ display: "flex", my: 2 }}>
				<CardActionArea
					sx={{ display: "flex", flexGrow: 1 }}
					onClick={() => console.log("Boop")}
				>
					<Box sx={{ display: "flex", flexGrow: 1 }}>
						<CardContent sx={{ flex: "1 0 auto" }}>
							<Typography component="div" variant="h5">
								{name}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary" component="div">
								{user}
							</Typography>
						</CardContent>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 240, height: 135 }}
						image={image}
						alt={name}
					/>
				</CardActionArea>
			</Card>
		</Link>
	);
}
