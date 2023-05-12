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
	{ name: "Articles", anchor: "/articles" },
	{ name: "Tiny Homes", anchor: "/tiny-homes" },
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
				boxShadow: "inset 0px -1px 1px rgb(0, 0, 0)",
				backgroundColor: "rgba(0, 0, 0, 0.85)",
				backdropFilter: "blur(8px)",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link href="/" sx={{ textDecoration: "none", color: "#fff" }}>
						<Box
							sx={{
								display: { xs: "none", sm: "flex" },
								alignItems: "center",
							}}
						>
							<Image
								src="/images/LogoSlim.png"
								width={320}
								height={50}
								alt="Logo"
							></Image>
						</Box>
					</Link>
					<Link
						href="/"
						sx={{
							textDecoration: "none",
							color: "#fff",
							flexGrow: 1,
							display: { xs: "flex", sm: "none" },
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", sm: "none" },
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h6"
								noWrap
								component="p"
								// href="/"
								sx={{
									display: { xs: "flex", sm: "none" },
									mr: 1,
									fontFamily: "'Arimo', sans-serif",
									fontWeight: 100,
									color: "inherit",
									textDecoration: "none",
									fontSize: "28px",
								}}
							>
								ab |
							</Typography>

							<Typography
								variant="h6"
								noWrap
								component="p"
								// href="/"
								sx={{
									display: { xs: "flex", sm: "none" },
									mt: "4px",
									fontWeight: 400,
									// letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
									fontSize: "18px",
								}}
							>
								DES
							</Typography>
							<ExtruderLogo />
							<Typography
								variant="h6"
								noWrap
								component="p"
								// href="/"
								sx={{
									mr: 2,
									display: { xs: "flex", sm: "none" },
									mt: "4px",
									fontWeight: 400,
									// letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
									fontSize: "18px",
								}}
							>
								GNS
							</Typography>
						</Box>
					</Link>
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
