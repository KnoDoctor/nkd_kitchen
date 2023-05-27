import * as React from "react";

import Image from "next/image";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AdbIcon from "@mui/icons-material/Adb";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import { useRouter } from "next/router";

import Link from "../_atoms/Link";
import ExtruderLogo from "../_atoms/ExtruderLogo";

const pages = [
	{ name: "Home", anchor: "/" },
	{ name: "Recipes", anchor: "/recipes" },
	// { name: "Tiny Homes", anchor: "/tiny-homes" },
	{ name: "About Us", anchor: "/about" },
	{ name: "Contact", anchor: "/contact" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
	const router = useRouter();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				boxShadow: "inset 0px -1px 1px rgb(10, 10, 10)",
				backgroundColor: "rgba(10, 10, 10, 0.85)",
				backdropFilter: "blur(8px)",
			}}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: { xs: "flex" },
							flexGrow: 1,
							alignItems: "center",
						}}
					>
						<Link
							href="/"
							sx={{ textDecoration: "none", color: "#fff", display: "flex" }}
						>
							<Image
								src="/images/logos/slim_logo.png"
								width={125}
								height={37}
								alt="Logo"
							></Image>
						</Link>
					</Box>
					{/* <Link
						href="/"
						sx={{
							textDecoration: "none",
							color: "#fff",
							flexGrow: 1,
							display: { xs: "flex" },
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex" },

								alignItems: "center",
							}}
						>
							<Typography
								variant="h6"
								noWrap
								component="p"
								// href="/"
								sx={{
									display: { xs: "flex" },
									mr: 1,
									fontFamily: "'Arimo', sans-serif",
									fontWeight: 100,
									color: "inherit",
									textDecoration: "none",
									fontSize: "28px",
								}}
							>
								SaaS |
							</Typography>

							<Typography
								variant="h6"
								noWrap
								component="p"
								// href="/"
								sx={{
									display: { xs: "flex" },
									mt: "4px",
									fontWeight: 400,
									// letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
									fontSize: "18px",
								}}
							>
								STARTER
							</Typography>
						</Box>
					</Link> */}
					<Box
						sx={{
							// flexGrow: 1,
							display: { xs: "flex", sm: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", sm: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.anchor}
									onClick={() => {
										handleCloseNavMenu();
										router.push(page.anchor);
									}}
								>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "flex" },
							justifyContent: "right",
						}}
					>
						{pages.map((page) => (
							<Button
								key={page.anchor}
								onClick={() => router.push(page.anchor)}
								sx={{
									color: "white",
									display: "block",
								}}
							>
								{page.name}
							</Button>
						))}
					</Box>

					{/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
