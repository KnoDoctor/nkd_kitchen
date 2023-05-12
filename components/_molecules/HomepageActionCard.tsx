import * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface HomepageActionCardProps {
	i: number;
	label: string;
	anchor: string;
	project: {
		image: string;
		name: string;
		description?: string;
	};
}

export default function HomepageActionCard({ label, anchor, project, i }: HomepageActionCardProps) {
	const fadeIndDelay = i * 0.1;
	const router = useRouter();

	return (
		<Card
			raised
			component={motion.div}
			// whileHover={
			//     {
			//         // scale: 1.01,
			//         // transition: { duration: 0.2 },
			//     }
			// }
			initial={{
				y: 20,
				opacity: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
				transition: {
					duration: 1,
					delay: fadeIndDelay,
					type: "spring",
					bounce: 0.3,
				},
			}}
			// whileInView={{
			//     y: 0,
			//     opacity: 1,
			//     transition: {
			//         type: "spring",
			//         bounce: 0.4,
			//         duration: 1.2,
			//     },
			// }}
			// viewport={{ once: true, amount: amount }}
		>
			<ButtonBase
				focusRipple
				sx={{ display: "flex", flexDirection: "column", width: "100%" }}
				onClick={() => router.push(anchor)}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" sx={{ textAlign: "center", m: 0 }}>
						{label}
					</Typography>
					{project.description ? (
						<Typography variant="body2" color="text.secondary">
							{project.description}
						</Typography>
					) : (
						<></>
					)}
				</CardContent>
				{/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
			</ButtonBase>
		</Card>
	);
}
