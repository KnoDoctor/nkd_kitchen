import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import MuiDrawer from "@mui/material/Drawer";
import MuiSwipeanleDrawer from "@mui/material/SwipeableDrawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import LuggageIcon from "@mui/icons-material/Luggage";
import BuildIcon from "@mui/icons-material/Build";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import TopNavBar from "./TopNavBar";
import Link from "../../src/Link";
import { Container } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "left",
	paddingLeft: "20px",
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: "64px",
		width: `calc(100% - ${64}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer({ children }: any) {
	const theme = useTheme();
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const handleDrawerOpen = (isDrawerOpen: boolean) => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<Box sx={{ display: "flex", flexGrow: 1 }}>
			<TopNavBar
				isXs={isXs}
				isDrawerOpen={isDrawerOpen}
				handleDrawerOpen={handleDrawerOpen}
			/>
			{/* <CssBaseline />
            <AppBar position="fixed" open={true}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar> */}
			{isXs && (
				<Box
					sx={{ height: "100vh", display: "flex", flexDirection: "column", flexGrow: 1 }}
				>
					<DrawerHeader />
					<Container
						maxWidth={false}
						sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
					>
						{children}
					</Container>
				</Box>
			)}
			<Drawer
				sx={{ height: "100%", display: "flex", flexDirection: "column" }}
				variant="permanent"
				anchor={isXs ? "right" : "left"}
				open={isDrawerOpen}
			>
				<DrawerHeader
					sx={{
						boxShadow: "inset 0px -1px 1px rgb(0, 0, 0)",
						backgroundColor: "rgba(0, 0, 0, 0)",
						backdropFilter: "blur(8px)",
					}}
				>
					{/* <IconButton
						sx={{ color: "#fff", padding: 0 }}
						onClick={() => handleDrawerOpen(isDrawerOpen)}
					>
						<MenuIcon />
					</IconButton> */}
				</DrawerHeader>

				<List sx={{ flexGrow: 1 }}>
					{[
						{
							label: "Marketing",
							icon: <StoreIcon />,
							href: "/admin/marketing",
						},
						{
							label: "Sales",
							icon: <PointOfSaleIcon />,
							href: "/admin/sales",
						},
						{
							label: "Client Services",
							icon: <RoomServiceIcon />,
							href: "/admin/client-services",
						},
						{
							label: "Operations",
							icon: <AccountTreeIcon />,
							href: "/admin/operations",
						},
						{
							label: "Loyalty",
							icon: <LoyaltyIcon />,
							href: "/admin/loyalty",
						},
						{
							label: "Analytics",
							icon: <AnalyticsIcon />,
							href: "/admin/analytics",
						},
						{
							label: "Admin Settings",
							icon: <AdminPanelSettingsIcon />,
							href: "/admin/admin-settings",
						},
					].map((module, index) => (
						<ListItem key={module.label} disablePadding sx={{ display: "block" }}>
							<Link
								sx={{
									textDecoration: "none",
									color: "inherit",
								}}
								href={module.href}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: isDrawerOpen ? "initial" : "center",
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: isDrawerOpen ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{module.icon}
									</ListItemIcon>
									<ListItemText
										primary={module.label}
										sx={{ opacity: isDrawerOpen ? 1 : 0 }}
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
				<List>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link
							sx={{
								textDecoration: "none",
								color: "inherit",
							}}
							href={"/"}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: isDrawerOpen ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: isDrawerOpen ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									<ArrowBackIcon />
								</ListItemIcon>
								<ListItemText
									primary={"Return to Site"}
									sx={{ opacity: isDrawerOpen ? 1 : 0 }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</Drawer>
			{!isXs && (
				<Box
					sx={{ height: "100vh", display: "flex", flexDirection: "column", flexGrow: 1 }}
				>
					<DrawerHeader />
					<Container
						maxWidth={false}
						sx={{
							p: 3,
							flexGrow: 1,
							display: "flex",
							flexDirection: "column",
							backgroundColor: "#e9e9e9",
						}}
					>
						{children}
					</Container>
				</Box>
			)}
		</Box>
	);
}
