import React from "react";
import Breadcrumbs from "../../../components/_molecules/Breadcrumbs";
import ModuleMenu from "../../../components/_molecules/ModuleMenu";

const clientServicesModules = [
	// { name: "My Clients", anchor: "/admin/client-services/clients" },
	{ name: "People", anchor: "/admin/client-services/people" },
];

const Marketing = () => {
	return (
		<div>
			<Breadcrumbs breadcrumbs={[{ label: "Client Services", anchor: null }]} />
			<ModuleMenu menuItems={clientServicesModules} />
		</div>
	);
};

export default Marketing;
