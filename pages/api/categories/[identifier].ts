import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prismaClientInstance";

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let category_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(category_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getCategory();
		case "PATCH":
			return updateCategory();
		case "DELETE":
			return deleteCategory();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getCategory() {
		try {
			let category = await prisma.categories.findUnique({
				where: {
					category_id,
				},
				include: {
					recipes_categories: {
						select: {
							recipes: true,
						},
					},
				},
			});

			if (category) {
				res.status(200).json({
					success: true,
					data: category,
				});
			} else {
				res.status(404).json({
					success: false,
					data: category,
				});
			}
		} catch (error) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function updateCategory() {
		try {
			const { category_name, category_image } = req.body;

			const patchedPost = await prisma.categories.update({
				where: {
					category_id,
				},
				data: {
					category_name,
					category_image,
				},
			});

			res.status(200).json({
				success: true,
				data: patchedPost,
			});
		} catch (error) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function deleteCategory() {
		try {
			const deletedPost = await prisma.categories.delete({
				where: {
					category_id,
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
