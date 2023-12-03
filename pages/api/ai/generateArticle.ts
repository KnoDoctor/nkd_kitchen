import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

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

			const response = await openai.completions.create({
				model: "text-davinci-003",
				prompt,
				max_tokens: 1000,
			});

			// Convert the response into a friendly text-stream
			const stream = OpenAIStream(response as any);
			// Respond with the stream
			return new StreamingTextResponse(stream);

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
