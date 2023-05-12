import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const configuration = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_DALLE_SK,
});

const openai = new OpenAIApi(configuration);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return generateArticleInfo();
		case "POST":
			return generateArticle();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function generateArticleInfo() {
		try {
			res.status(200).json({
				success: true,
				data: {
					message: "How To is Coming Soon",
				},
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function generateArticle() {
		try {
			const { prompt } = req.body;

			if (!prompt) {
				return res.status(400).json({
					success: false,
					error: "Could not generate article, prompt parameter is missing.",
				});
			}

			const result = await openai.createCompletion({
				model: "text-davinci-003",
				prompt,
				max_tokens: 1000,
			});

			console.log("ARTICLE: ", result.data.choices[0].text);

			res.status(201).json({
				success: true,
				data: {
					article: result.data.choices[0].text,
				},
			});

			// await cloudinary.v2.uploader.upload(
			// 	result?.data?.data?.[0]?.url,
			// 	{ upload_preset: "kavzrzu2" },
			// 	(error: any, result: any) => {
			// 		if (error)
			// 			return res.status(500).json({
			// 				error,
			// 			});
			// 		res.status(201).json({
			// 			success: true,
			// 			data: {
			// 				result,
			// 				cloudinaryUrl: result.secure_url,
			// 			},
			// 		});
			// 	}
			// );

			// res.status(201).json({
			// 	success: true,
			// 	prompt,
			// 	openai,
			// 	configuration,
			// 	url: result?.data?.data?.[0]?.url,
			// 	data: "Coming Soon",
			// });
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}
}
