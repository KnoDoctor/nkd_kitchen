import * as React from "react";

import Image from "next/image";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
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
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ExtruderLogo from "../_atoms/ExtruderLogo";

import { signIn, signOut, useSession } from "next-auth/react";

import Link from "../../src/Link";

import MyAccountMenu from "../_molecules/MyAccountMenu";

const pages = [
	{ label: "Home", destination: "/" },
	{ label: "Client", destination: "/client" },
	{ label: "Server", destination: "/server" },
	{ label: "Protected", destination: "/protected" },
	{ label: "API", destination: "/api-example" },
	{ label: "Admin", destination: "/admin" },
	{ label: "Me", destination: "/me" },
];
const settings = ["Profile", "Account", "Dashboard"];

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<MuiAppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	// marginLeft: "64px",
	// width: `calc(100% - ${64}px)`,
	[theme.breakpoints.up("sm")]: {
		marginLeft: "64px",
		width: `calc(100% - ${64}px)`,
	},
	// transition: theme.transitions.create(["width", "margin"], {
	//     easing: theme.transitions.easing.sharp,
	//     duration: theme.transitions.duration.enteringScreen,
	// }),
}));

const menuItems = [
	{ label: "How To Travel", anchor: "/" },
	{ label: "Ways To Go", anchor: "/" },
	{ label: "Places To Go", anchor: "/" },
	{ label: "Find A Trip", anchor: "/" },
	{ label: "Who We Are", anchor: "/" },
	// { label: 'Travel Journal', anchor: '/' }
];
const ctas = [
	{ label: "Start Planning", anchor: "/" },
	{ label: "Join Cru", anchor: "/" },
	{ label: "Contact Us", anchor: "/" },
];

interface TopNavBarProps {
	isXs: boolean;
	isDrawerOpen: boolean;
	handleDrawerOpen(isDrawerOpen: boolean): any;
}

const TopNavBar = ({ isXs, isDrawerOpen, handleDrawerOpen }: TopNavBarProps) => {
	const { data: session, status } = useSession();
	const loading = status === "loading";
	const theme = useTheme();

	return (
		<>
			<CssBaseline />
			<AppBar
				position="fixed"
				elevation={0}
				sx={{
					boxShadow: "inset 0px -1px 1px rgb(0, 0, 0)",
					backgroundColor: "rgba(0, 0, 0, 0.85)",
					backdropFilter: "blur(8px)",
					marginLeft: "0 !important",
					width: "100% !important",
				}}
			>
				<Container maxWidth={false} sx={{ paddingLeft: "20px !important" }}>
					<Toolbar disableGutters>
						<Box
							sx={{
								minHeight: "64px",
								display: "flex",
								alignItems: "center",
							}}
						>
							<IconButton
								sx={{ color: "#fff", padding: 0, mr: "30px" }}
								onClick={() => handleDrawerOpen(isDrawerOpen)}
							>
								<MenuIcon />
							</IconButton>
							<Box
								sx={{
									display: { xs: "flex" },
									flexGrow: 1,
									alignItems: "center",
								}}
							>
								<Link href="/admin" sx={{ textDecoration: "none", color: "#fff" }}>
									<Image
										src="/images/logos/primary_logo.png"
										width={60}
										height={55}
										alt="Logo"
									></Image>
								</Link>
							</Box>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								//	display: { xs: "flex", md: "none" },
							}}
						>
							{/* <IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
								sx={{
									paddingLeft: "4px",
									display: { xs: "flex", sm: "none" },
								}}
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
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<Link key={page.destination} href={page.destination}>
										<MenuItem
											key={page.destination}
											onClick={handleCloseNavMenu}
										>
											<Typography textAlign="center">{page.label}</Typography>
										</MenuItem>
									</Link>
								))}
							</Menu> */}
						</Box>
						<IconButton
							edge="start"
							size="large"
							color="inherit"
							aria-label="open drawer"
							onClick={() => handleDrawerOpen(isDrawerOpen)}
							sx={{
								display: { xs: "none" },
							}}
						>
							<MenuIcon />
						</IconButton>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge color="secondary">
								<SearchIcon />
							</Badge>
						</IconButton>
						{!loading && (
							<>
								{!session && (
									<IconButton
										href={`/api/auth/signin`}
										size="large"
										aria-label="show 17 new notifications"
										color="inherit"
										onClick={(e) => {
											e.preventDefault();
											signIn();
										}}
									>
										<LoginIcon />
									</IconButton>
								)}

								{session?.user && (
									<MyAccountMenu
										avatar={{
											alt: session.user.name,
											src: session.user.image,
										}}
									/>
								)}
							</>
						)}
						{/* {!user ? (
							<>
								<IconButton
									href="/api/auth/login"
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge color="secondary">
										<LoginIcon />
									</Badge>
								</IconButton>
							</>
						) : (
							<MyAccountMenu avatar={{ alt: user.name, src: user.picture }} />
						)} */}
					</Toolbar>
				</Container>
			</AppBar>
			{/* <SwipeableDrawer
				menuItems={menuItems}
				ctas={ctas}
				isOpen={isDrawerOpen}
				open={handleDrawerOpen}
				close={handleDrawerClose}
			/> */}
		</>
	);
};
export default TopNavBar;
