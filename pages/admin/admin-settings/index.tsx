import React from "react";
import Breadcrumbs from "../../../components/_molecules/Breadcrumbs";
import ModuleMenu from "../../../components/_molecules/ModuleMenu";

const adminSettingsModules = [
	// { name: "Campaigns", anchor: "/admin/marketing/campaigns" },
	// { name: "Expressions of Interest", anchor: "/admin/marketing/expressions-of-interest" },
	{ name: "Entities", anchor: "/admin/admin-settings/entities" },
	{ name: "Modules", anchor: "/admin/admin-settings/modules" },
	// { name: "Projects", anchor: "/admin/marketing/projects" },
	// { name: "Articles", anchor: "/admin/marketing/articles" },
	// { name: "Pages", anchor: "/admin/marketing/pages" },
];

const Marketing = () => {
	return (
		<div>
			<Breadcrumbs breadcrumbs={[{ label: "Admin Settings", anchor: null }]} />
			<ModuleMenu menuItems={adminSettingsModules} />
		</div>
	);
};

export default Marketing;
