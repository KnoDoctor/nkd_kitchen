import MiniDrawer from "../__navigation/MiniDrawer";

interface TripReportLayoutProps {
	children: JSX.Element | JSX.Element[];
}
const AppLayout = ({ children }: TripReportLayoutProps) => {
	return (
		<main>
			<MiniDrawer children={children} />
		</main>
	);
};

export default AppLayout;
