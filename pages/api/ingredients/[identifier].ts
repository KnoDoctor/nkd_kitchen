import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let ingredient_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(ingredient_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getIngredient();
		case "PATCH":
			return updateIngredient();
		case "DELETE":
			return deleteIngredient();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getIngredient() {
		try {
			let ingredient = await prisma.ingredients.findUnique({
				where: {
					ingredient_id,
				},
				include: {
					substituted_ingredient: {
						select: {
							substituted_quantity: true,
							substituting_quantity: true,
							substituted_unit: true,
							substituting_unit: true,
							additional_info: true,
							substituting_ingredient: {
								select: {
									ingredient_name: true,
								},
							},
						},
					},
					substituting_ingredient: {
						select: {
							substituted_quantity: true,
							substituting_quantity: true,
							substituted_unit: true,
							substituting_unit: true,
							additional_info: true,
							substituted_ingredient: {
								select: {
									ingredient_name: true,
								},
							},
						},
					},
				},
			});

			if (ingredient) {
				res.status(200).json({
					success: true,
					data: ingredient,
				});
			} else {
				res.status(404).json({
					success: false,
					data: ingredient,
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

	async function updateIngredient() {
		try {
			const { ingredient_name, ingredient_image } = req.body;

			const patchedPost = await prisma.ingredients.update({
				where: {
					ingredient_id,
				},
				data: {
					ingredient_name,
					ingredient_image,
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

	async function deleteIngredient() {
		try {
			const deletedPost = await prisma.ingredients.delete({
				where: {
					ingredient_id,
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
