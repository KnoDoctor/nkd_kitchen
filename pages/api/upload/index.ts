import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";

const cloudinary = require("cloudinary");

export const config = {
	api: {
		bodyParser: false,
	},
};

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const form = new IncomingForm();

		form.parse(req, async (error: any, fields: any, files: any) => {
			if (error)
				return res.status(500).json({
					error,
				});

			cloudinary.v2.uploader.upload(
				files.upload.filepath,
				{ upload_preset: "kavzrzu2" },
				(error: any, result: any) => {
					if (error)
						return res.status(500).json({
							error,
						});
					res.status(200).json({
						fields,
						files,
						url: result.secure_url,
					});
				}
			);
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
};
