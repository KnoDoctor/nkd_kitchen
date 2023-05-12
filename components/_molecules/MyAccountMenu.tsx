import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

import { signIn, signOut, useSession } from "next-auth/react";

import useMediaQuery from "@mui/material/useMediaQuery";

import Link from "../../src/Link";

export default function MyAccountMenu({ avatar }: any) {
	// const isMobile = useMediaQuery("(max-width:599px)");

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		//	if (isMobile) return;
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				{/* <Tooltip title="Account settings" disableHoverListener={isMobile}> */}
				<IconButton
					onClick={handleClick}
					size="large"
					edge="end"
					aria-controls={open ? "account-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
				>
					<Avatar sx={{ width: 28, height: 28 }} alt={avatar.alt} src={avatar.src} />
				</IconButton>
				{/* </Tooltip> */}
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{/* <MenuItem>
                    <Avatar alt={avatar.alt} src={avatar.src} />
                    <Typography variant="h6" sx={{fontSize:'1rem', textTransform:"title"}}>
                        {contact.firstname} {contact.lastname}
                    </Typography>
                </MenuItem>
                <Divider /> */}
				<Link
					href={`${process.env.NEXT_PUBLIC_TRAVELLER_PORTAL_URL}/profile`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<AccountBoxOutlinedIcon fontSize="medium" />
						</ListItemIcon>
						Profile
					</MenuItem>
				</Link>
				<Link
					href={`${process.env.NEXT_PUBLIC_TRAVELLER_PORTAL_URL}/trips`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<CardTravelOutlinedIcon fontSize="medium" />
						</ListItemIcon>
						Your Trips
					</MenuItem>
				</Link>
				<Link
					href={`${process.env.NEXT_PUBLIC_TRAVELLER_PORTAL_URL}/trip-planner`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<EventIcon fontSize="medium" />
						</ListItemIcon>
						Trip Planner
					</MenuItem>
				</Link>
				<Link
					href={`${process.env.NEXT_PUBLIC_TRAVELLER_PORTAL_URL}/contact`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<MessageOutlinedIcon fontSize="medium" />
						</ListItemIcon>
						Contact Us
					</MenuItem>
				</Link>
				<Link
					href={`${process.env.NEXT_PUBLIC_STAFF_PORTAL_URL}`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<BadgeOutlinedIcon fontSize="medium" />
						</ListItemIcon>
						Staff
					</MenuItem>
				</Link>
				<Link
					href={`${process.env.NEXT_PUBLIC_GUIDE_PORTAL_URL}`}
					sx={{ textDecoration: "none" }}
				>
					<MenuItem>
						<ListItemIcon>
							<PsychologyOutlinedIcon fontSize="medium" />
						</ListItemIcon>
						Guide
					</MenuItem>
				</Link>

				<MenuItem
					onClick={(e) => {
						e.preventDefault();
						signOut({
							callbackUrl: `/`,
						});
					}}
				>
					<ListItemIcon>
						<Logout fontSize="medium" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
