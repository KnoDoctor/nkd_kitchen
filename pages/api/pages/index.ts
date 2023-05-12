import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getPages();
		case "POST":
			return createPage();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getPages() {
		try {
			const allPages = await prisma.pages.findMany();

			res.status(200).json({
				success: true,
				data: allPages,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createPage() {
		try {
			const { page_name, page_lookup_string } = req.body;

			if (!page_name) {
				return res.status(400).json({
					success: false,
					error: "Could not create page, name parameter is missing.",
				});
			}
			if (!page_lookup_string) {
				return res.status(400).json({
					success: false,
					error: "Could not create page, page lookup string parameter is missing.",
				});
			}
			// if (!email) {
			// 	return res.status(400).json({
			// 		success: false,
			// 		error: "Could not create page, email parameter is missing.",
			// 	});
			// }

			const createdPage = await prisma.pages.create({
				data: {
					page_id: generateGuid(),
					page_name,
					page_lookup_string,
				},
			});

			res.status(201).json({
				success: true,
				data: createdPage,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}
}
