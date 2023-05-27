import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "../../_atoms/Link";

interface CategoryCardProps {
	categoryName: string;
	imageUrl: string;
}

const CategoryCard = ({ categoryName, imageUrl }: CategoryCardProps) => {
	return (
		<Link href={"/about"} sx={{ textDecoration: "none" }}>
			<Card elevation={6} sx={{ width: "240px", borderRadius: "4px", margin: "0.5rem" }}>
				<CardActionArea onClick={() => console.log("Boop")}>
					<CardMedia sx={{ height: 240 }} image={imageUrl} title="Lake Pichola" />
					<CardContent>
						{/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Features & Stories
					</Typography> */}
						<Typography variant={"h6"} fontWeight={300} my={1} textAlign={"center"}>
							{categoryName}
						</Typography>
						{/* <Typography variant="body2">
						We take a look at the things you need to consider when building a tiny house
						in southern Ontario.
					</Typography> */}
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

export default CategoryCard;
