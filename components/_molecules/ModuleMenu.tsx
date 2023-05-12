import React from "react";

import { Card, Grid, ButtonBase } from "@mui/material";

import Link from "../../src/Link";

const ModuleMenu = ({ menuItems }: any) => {
	return (
		<Card sx={{ p: 2, my: 2 }}>
			<Grid container spacing={3}>
				{menuItems.map((menuItem: any) => (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<Link href={menuItem.anchor}>
							<ButtonBase sx={{ width: "100%" }}>
								<Card
									variant={"outlined"}
									sx={{ p: 3, width: "100%", background: "#fafafa" }}
								>
									{menuItem.name}
								</Card>
							</ButtonBase>
						</Link>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default ModuleMenu;
