import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let recipe_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(recipe_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getRecipe();
		case "PATCH":
			return updateRecipe();
		case "DELETE":
			return deleteRecipe();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getRecipe() {
		try {
			let recipe = await prisma.recipes.findUnique({
				where: {
					recipe_id,
				},
				include: {
					recipe_ingredients: {
						select: {
							ingredients: {
								include: {
									substituting_ingredient: true,
									substituted_ingredient: true,
								},
							},
							quantity: true,
							unit: true,
						},
					},
				},
			});

			if (recipe) {
				res.status(200).json({
					success: true,
					data: recipe,
				});
			} else {
				res.status(404).json({
					success: false,
					data: recipe,
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

	async function updateRecipe() {
		try {
			const { recipe_name, recipe_image, recipe_description, cms_data } = req.body;

			const patchedPost = await prisma.recipes.update({
				where: {
					recipe_id,
				},
				data: {
					recipe_name,
					recipe_image,
					recipe_description,
					cms_data,
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

	async function deleteRecipe() {
		try {
			const deletedPost = await prisma.recipes.delete({
				where: {
					recipe_id,
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
