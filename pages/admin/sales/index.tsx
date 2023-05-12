import Breadcrumbs from "../../../components/_molecules/Breadcrumbs";
import ModuleMenu from "../../../components/_molecules/ModuleMenu";

const salesModules = [
	{ name: "People", anchor: "/admin/sales/people" },
	// { name: "Prospects", anchor: "/admin/sales/prospects" },
	// { name: "Opportunities", anchor: "/admin/sales/opportunities" },
	// { name: "Entities", anchor: "/admin/sales/entities" },
];

const Sales = () => {
	return (
		<div>
			<Breadcrumbs breadcrumbs={[{ label: "Sales", anchor: null }]} />
			<ModuleMenu menuItems={salesModules} />
		</div>
	);
};

export default Sales;
