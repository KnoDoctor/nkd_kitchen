import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

/*
The Code below was refactor by ChatGPT
*/
import sendError from "../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	switch (method) {
		case "GET":
			return getArticle(req, res);
		case "PATCH":
			return updateArticle(req, res);
		case "DELETE":
			return deleteArticle(req, res);
		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}
}

async function getArticle(req: NextApiRequest, res: NextApiResponse) {
	const { identifier } = req.query;
	const article_id = typeof identifier === "string" ? identifier : "";

	try {
		let article;

		if (!checkIfGuid(article_id)) {
			article = await prisma.articles.findMany({
				where: {
					article_lookup_string: article_id,
				},
			});

			if (article.length === 1) {
				res.status(200).json({
					success: true,
					data: article,
				});
			} else {
				res.status(404).json({
					success: false,
					data: article,
				});
			}
		} else {
			article = await prisma.articles.findUnique({
				where: {
					article_id,
				},
			});
			if (article) {
				res.status(200).json({
					success: true,
					data: article,
				});
			} else {
				res.status(404).json({
					success: false,
					data: article,
				});
			}
		}
	} catch (error) {
		console.log(error);
		sendError(res, 400, error);
	}
}

async function updateArticle(req: NextApiRequest, res: NextApiResponse) {
	const { identifier } = req.query;
	const article_id = typeof identifier === "string" ? identifier : "";

	try {
		const {
			article_name,
			article_description,
			article_lookup_string,
			cms_data,
			article_hero_image,
			is_published,
		} = req.body;

		const patchedPost = await prisma.articles.update({
			where: {
				article_id,
			},
			data: {
				article_name,
				article_lookup_string,
				article_description,
				cms_data,
				article_hero_image,
				is_published,
			},
		});

		res.status(200).json({
			success: true,
			data: patchedPost,
		});
	} catch (error: any) {
		console.log(error);
		sendError(res, 400, { message: error.message, name: error.name });
	}
}

async function deleteArticle(req: NextApiRequest, res: NextApiResponse) {
	const { identifier } = req.query;
	const article_id = typeof identifier === "string" ? identifier : "";

	try {
		const deletedPost = await prisma.articles.delete({
			where: {
				article_id,
			},
		});

		res.status(200).json({
			success: true,
			data: null,
		});
	} catch (error) {
		console.log(error);
		sendError(res, 400, error);
	}
}
