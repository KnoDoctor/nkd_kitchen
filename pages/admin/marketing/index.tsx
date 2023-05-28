import React from "react";
import Breadcrumbs from "../../../components/_molecules/Breadcrumbs";
import ModuleMenu from "../../../components/_molecules/ModuleMenu";

const marketingModules = [
	{ name: "Pages", anchor: "/admin/marketing/pages" },
	{ name: "Recipes", anchor: "/admin/marketing/recipes" },
	{ name: "Ingredients", anchor: "/admin/marketing/ingredients" },
	{ name: "People", anchor: "/admin/marketing/people" },
	{ name: "Categories", anchor: "/admin/marketing/categories" },
];

const Marketing = () => {
	return (
		<div>
			<Breadcrumbs breadcrumbs={[{ label: "Marketing", anchor: null }]} />
			<ModuleMenu menuItems={marketingModules} />
		</div>
	);
};

export default Marketing;
