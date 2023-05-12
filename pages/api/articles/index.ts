import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

/*
The Code below was refactor by ChatGPT
*/

import sendError from "../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getArticles(req, res);
		case "POST":
			return createArticle(req, res);
		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}

	async function getArticles(req: NextApiRequest, res: NextApiResponse) {
		try {
			const allArticles = await prisma.articles.findMany();

			res.status(200).json({
				success: true,
				data: allArticles,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}

	async function createArticle(req: NextApiRequest, res: NextApiResponse) {
		try {
			const { article_name, article_lookup_string, email } = req.body;

			if (!article_name) {
				return sendError(res, 400, "Could not create article, name parameter is missing.");
			}
			if (!article_lookup_string) {
				return sendError(
					res,
					400,
					"Could not create article, article slug parameter is missing."
				);
			}

			const createdArticle = await prisma.articles.create({
				data: {
					article_id: generateGuid(),
					article_name,
					article_lookup_string,
				},
			});

			res.status(201).json({
				success: true,
				data: createdArticle,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
}
