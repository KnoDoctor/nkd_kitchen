import Chip from "@mui/material/Chip";

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
