import { useState } from "react";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

const DeleteableChip = ({
	relation,
	handleRelationSetupData,
	handleRelation,
	relatableEntityName,
	relatableEntityFieldPrefix,
}: any) => {
	const [isDeleting, setIsDeleting] = useState(false);

	if (
		relation[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_name`] ===
			"ZZLoading..." ||
		isDeleting
	)
		return (
			<Chip
				label={
					<Grid container spacing={1}>
						<Grid item>
							<Skeleton width={75} />
						</Grid>
						<Grid item>
							<Skeleton width={20} />
						</Grid>
					</Grid>
				}
			/>
		);

	return (
		<>
			<Chip
				label={relation[`${relatableEntityName}`][`${relatableEntityFieldPrefix}_name`]}
				onDelete={() => {
					setIsDeleting(true);
					handleRelation({
						...handleRelationSetupData,
						action: "DELETE",
					});
				}}
			/>
		</>
	);
};

export default DeleteableChip;
