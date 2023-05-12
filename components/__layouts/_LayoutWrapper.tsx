import { useState, useEffect } from "react";

import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";

import { useRouter } from "next/router";

const LayoutWrapper = ({ children }: any) => {
	const [isRouterReady, setIsRouterReady] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			setIsRouterReady(true);
			if (router.asPath.includes("/admin")) {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
		}
	}, [router]);

	return (
		<>
			{isRouterReady && isAdmin && <AdminLayout>{children}</AdminLayout>}
			{isRouterReady && !isAdmin && <MainLayout>{children}</MainLayout>}
		</>
	);
};

export default LayoutWrapper;
