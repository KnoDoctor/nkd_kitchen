import { useState } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";

export default function PrivatePage(props) {
	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	const uploadToServer = async (event) => {
		const body = new FormData();
		// console.log("file", image)
		body.append("upload", image);
		const response = await fetch("/api/upload", {
			method: "POST",
			body,
		});
	};

	return (
		<div>
			<div>
				<CldUploadButton
					onUpload={function (error, result, widget) {
						console.log(result);
					}}
					uploadPreset="kavzrzu2"
				/>
				<CldImage
					width="960"
					height="600"
					src="v1673808821/cld-sample-5.jpg"
					sizes="100vw"
				/>
				<img src={createObjectURL} />
				<h4>Select Image</h4>
				<input type="file" name="myImage" onChange={uploadToClient} />
				<button className="btn btn-primary" type="submit" onClick={uploadToServer}>
					Send to server
				</button>
			</div>
		</div>
	);
}
