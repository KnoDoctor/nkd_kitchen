import { useState } from "react";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

const AddableChip = ({
	relation,
	handleRelationSetupData,
	handleRelation,
	relatableEntityName,
	relatableEntityFieldPrefix,
}: any) => {
	return (
		<>
			<Chip
				label={relation[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_name`]}
				onClick={() => {
					handleRelation({
						...handleRelationSetupData,
						action: "POST",
					});
				}}
				variant="outlined"
			/>
		</>
	);
};

export default AddableChip;
