//React & Material-UI Imports
import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// import usePerson from "../../../../hooks/people/usePerson";
//Import Scrollable Anchor
// import ScrollableAnchor from 'react-scrollable-anchor';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface JeffsFirstComponentProps {
	section: any;
}

const JeffsFirstComponent = ({ section }: JeffsFirstComponentProps) => {
	console.log(section);

	// const person = usePerson(section.author);
	//Set Media Query
	const theme = useTheme();
	const mobileWidth = useMediaQuery(theme.breakpoints.down("md"));

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// if (person.isLoading) return <>Loading...</>;

	return section.sectionTitle ? (
		<div
			style={{
				maxWidth: mobileWidth ? "none" : "70%",
				margin: "auto",
				padding: "1.0rem 1.5rem",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Card sx={{ maxWidth: 345 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{/* {`${person.data.data.first_name[0]}${person.data.data.last_name[0]}`} */}
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={section.sectionTitle}
					// subheader={`By: ${person.data.data.first_name} ${person.data.data.last_name}`}
				/>
				<CardMedia
					component="img"
					height="194"
					image={section.cardImage}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						This impressive paella is a perfect party dish and a fun meal to cook
						together with your guests. Add 1 cup of frozen peas along with the mussels,
						if you like.
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					{/* <ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore> */}
				</CardActions>
				{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>Method:</Typography>
							<Typography paragraph>
								Heat 1/2 cup of the broth in a pot until simmering, add saffron and
								set aside for 10 minutes.
							</Typography>
							<Typography paragraph>
								Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
								over medium-high heat. Add chicken, shrimp and chorizo, and cook,
								stirring occasionally until lightly browned, 6 to 8 minutes.
								Transfer shrimp to a large plate and set aside, leaving chicken and
								chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
								onion, salt and pepper, and cook, stirring often until thickened and
								fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
								cups chicken broth; bring to a boil.
							</Typography>
							<Typography paragraph>
								Add rice and stir very gently to distribute. Top with artichokes and
								peppers, and cook without stirring, until most of the liquid is
								absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
								shrimp and mussels, tucking them down into the rice, and cook again
								without stirring, until mussels have opened and rice is just tender,
								5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
							</Typography>
							<Typography>
								Set aside off of the heat to let rest for 10 minutes, and then
								serve.
							</Typography>
						</CardContent>
					</Collapse> */}
			</Card>
		</div>
	) : (
		<></>
	);
};

export default JeffsFirstComponent;
