import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ArticleCard = () => {
	return (
		<Card elevation={6} sx={{ maxWidth: "240px", borderRadius: "4px", margin: "0.5rem" }}>
			<CardActionArea onClick={() => console.log("Boop")}>
				<CardMedia
					sx={{ height: 140 }}
					image="https://images.unsplash.com/photo-1682772226815-e13ffc0a3bc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
					title="Lake Pichola"
				/>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Features & Stories
					</Typography>
					<Typography variant={"h6"} sx={{ mb: 1.5, fontWeight: 300 }}>
						Quick and Easy Dinners
					</Typography>
					<Typography variant="body2">
						We take a look at the things you need to consider when building a tiny house
						in southern Ontario.
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ArticleCard;
