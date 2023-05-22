import Head from "next/head";

import NavBar from "../__navigation/NavBar";
import Copyright from "../../src/Copyright";

const MainLayout = ({ children }: any) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>The N_K_D Kitchen</title>
			</Head>
			<main id="app" data-testid="layout" style={{ position: "relative" }}>
				<NavBar />
				{children}
				<Copyright />
			</main>
		</>
	);
};

export default MainLayout;
