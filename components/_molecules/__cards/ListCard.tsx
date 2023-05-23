import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface ListCardProps {
	name: string;
	user: string;
	image: string;
	// link: string;
}

export default function ListCard({ name, user, image }: ListCardProps) {
	return (
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
					{/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
					<IconButton aria-label="previous">
                    {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
					</IconButton>
					<IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
					</IconButton>
					<IconButton aria-label="next">
                    {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
					</IconButton>
				</Box> */}
				</Box>
				<CardMedia component="img" sx={{ width: 200 }} image={image} alt={name} />
			</CardActionArea>
		</Card>
	);
}
