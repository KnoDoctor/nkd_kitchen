import React, { Component } from "react";

import { useRouter } from "next/router";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Box, Button, Card, Divider, Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import OutlinedInput from "@mui/material/OutlinedInput";

import Link from "../../src/Link";
import ActionModal from "../_atoms/ActionsModal";

interface BreadcrumbsProps {
	breadcrumbs: {
		label: string;
		anchor: string | null;
	}[];
	actions?: {
		label: string;
		component: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	}[];
}

const Breadcrumbs = ({ breadcrumbs, actions }: BreadcrumbsProps) => {
	const router = useRouter();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Card sx={{ p: 2 }}>
			<Grid container direction={isSm ? "column-reverse" : "row"}>
				<Grid item xs={6} md={8} sx={{ display: "flex", alignItems: "center" }}>
					<h2 style={{ margin: 0 }}>
						{router.asPath !== "/admin" ? (
							<Link
								href={`/admin`}
								style={{
									color: "grey",
									textDecoration: "none",
									textTransform: "capitalize",
								}}
							>
								Home
								{` > `}
							</Link>
						) : (
							<></>
						)}
						{breadcrumbs.map((breadcrumb: any) => {
							if (breadcrumb.anchor) {
								return (
									<Link
										href={`${breadcrumb.anchor}`}
										style={{
											color: "grey",
											textDecoration: "none",
											textTransform: "capitalize",
										}}
									>
										{breadcrumb.label}
										{` > `}
									</Link>
								);
							}
							if (breadcrumb.anchor === null) {
								return <>{breadcrumb.label}</>;
							}
						})}
					</h2>
				</Grid>
				<Grid item xs={6} md={4}>
					<FormControl sx={{ width: "100%", background: "#fafafa" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Filter</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							// type={values.showPassword ? 'text' : 'password'}
							// value={values.password}
							//onChange={handleChange("password")}
							endAdornment={
								<InputAdornment position="end">
									{/* <IconButton
											aria-label="search"
											//	onClick={handleClickShowPassword}
											//	onMouseDown={handleMouseDownPassword}
											edge="end"
										> */}
									<FilterListIcon />
									{/* </IconButton> */}
								</InputAdornment>
							}
							label="Filter"
						/>
					</FormControl>
				</Grid>
			</Grid>
			{actions && (
				<>
					<Divider sx={{ my: 2 }} />
					<Grid container>
						<Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
							{actions.map((action) => {
								return (
									<ActionModal label={action.label}>
										{action.component}
									</ActionModal>
								);
							})}
						</Grid>
					</Grid>
				</>
			)}
		</Card>
	);
};

export default Breadcrumbs;
