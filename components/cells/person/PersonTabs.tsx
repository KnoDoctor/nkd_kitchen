import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonPersonalInformation from "./PersonPersonalInformation";
import PersonProfileCard from "../../_molecules/people/PersonProfileCard";
import PersonTravellerProfile from "./PersonTravellerProfile";
import PersonTravelPreferences from "./PersonTravelPreferences";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface PersonTabsProps {
	person: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ py: 2 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function PersonTabs({ person }: PersonTabsProps) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ maxWidth: "calc(100vw - 155px)" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Personal Information" {...a11yProps(0)} />
					<Tab label="Customer Profile" {...a11yProps(1)} />
					<Tab label="Preferences" {...a11yProps(2)} />
					<Tab label="Order History" {...a11yProps(3)} />
				</Tabs>
			</Box>
			<Grid container sx={{ py: 2 }}>
				<Grid item xs={12} md={4}>
					<PersonProfileCard
						firstname={person.data.data.first_name}
						lastname={person.data.data.last_name}
					/>
				</Grid>
				<Grid xs={12} md={8} sx={{ pl: 4 }}>
					<TabPanel value={value} index={0}>
						<PersonPersonalInformation person={person} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<PersonTravellerProfile person={person} />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<PersonTravelPreferences person={person} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						Item Four
					</TabPanel>
					<TabPanel value={value} index={4}>
						Item Five
					</TabPanel>
				</Grid>
			</Grid>
		</Box>
	);
}
