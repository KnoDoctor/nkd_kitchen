import { useRouter } from "next/router";

import Breadcrumbs from "../../../components/_molecules/Breadcrumbs";
import ModuleMenu from "../../../components/_molecules/ModuleMenu";

import useModule from "../../../hooks/modules/useModule";

import { returnCurrentModule } from "../../../utils/helperFunctions";

const Module = () => {
	const router = useRouter();
	const module = useModule(router.query.module);

	const buildEntityList = (moduleName: string) => {
		if (module.isLoading) return [];
		return module.data.module.modules_entities.map((relationship: any) => {
			return {
				name: `${relationship.entities.entity_name}`,
				anchor: `/admin/${moduleName}/${relationship.entities.entity_slug}`,
			};
		});
	};

	return (
		<div>
			<Breadcrumbs breadcrumbs={[{ label: returnCurrentModule(router), anchor: null }]} />
			<ModuleMenu menuItems={buildEntityList(returnCurrentModule(router))} />
		</div>
	);
};

export default Module;
