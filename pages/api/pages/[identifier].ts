import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let page_id = typeof identifier === "string" ? identifier : "";

	switch (method) {
		case "GET":
			return getPage();
		case "PATCH":
			return updatePage();
		case "DELETE":
			return deletePage();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getPage() {
		try {
			let page;

			if (!checkIfGuid(page_id)) {
				page = await prisma.pages.findMany({
					where: {
						page_lookup_string: page_id,
					},
				});

				if (page.length === 1) {
					res.status(200).json({
						success: true,
						data: page,
					});
				} else {
					res.status(404).json({
						success: false,
						data: page,
					});
				}
			} else {
				page = await prisma.pages.findUnique({
					where: {
						page_id,
					},
				});
				if (page) {
					res.status(200).json({
						success: true,
						data: page,
					});
				} else {
					res.status(404).json({
						success: false,
						data: page,
					});
				}
			}
		} catch (error) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function updatePage() {
		try {
			const {
				page_name,
				cms_data,
				page_lookup_string,
				page_description,
				page_hero_image,
				is_published,
			} = req.body;

			const patchedPost = await prisma.pages.update({
				where: {
					page_id,
				},
				data: {
					page_name,
					cms_data,
					page_lookup_string,
					page_description,
					page_hero_image,
					is_published,
				},
			});

			res.status(200).json({
				success: true,
				data: patchedPost,
			});
		} catch (error: any) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: {
					message: error.message,
					name: error.name,
				},
			});
		}
	}

	async function deletePage() {
		try {
			const deletedPost = await prisma.pages.delete({
				where: {
					page_id,
				},
			});

			res.status(200).json({
				success: true,
				data: null,
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
