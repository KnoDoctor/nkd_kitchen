import { CldUploadButton } from "next-cloudinary";

const UploadButton = ({ setHasContentBeenEdited, setUpdatedHeroImage }) => {
	return (
		<CldUploadButton
			onUpload={function (error, result, widget) {
				console.log(result);
				console.log("HERE!!!!");

				setUpdatedHeroImage(result.info.secure_url);
				setHasContentBeenEdited(true);
			}}
			uploadPreset="kavzrzu2"
			style={{ marginBottom: "24px" }}
		/>
	);
};

export default UploadButton;
