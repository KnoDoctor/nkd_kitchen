import { useState, useEffect } from "react";

import MainLayout from "./MainLayout";
import RecipeLayout from "./RecipeLayout";
import AdminLayout from "./AdminLayout";

import { useRouter } from "next/router";

const LayoutWrapper = ({ children }: any) => {
	const [isRouterReady, setIsRouterReady] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isRecipe, setIsRecipe] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			setIsRouterReady(true);
			if (router.asPath.includes("/admin")) {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
			if (router.asPath.includes("/recipe")) {
				setIsRecipe(true);
			} else {
				setIsRecipe(false);
			}
		}
	}, [router]);

	return (
		<>
			{isRouterReady && isAdmin && <AdminLayout>{children}</AdminLayout>}
			{isRouterReady && !isAdmin && isRecipe && <RecipeLayout>{children}</RecipeLayout>}
			{isRouterReady && !isAdmin && !isRecipe && <MainLayout>{children}</MainLayout>}
		</>
	);
};

export default LayoutWrapper;
