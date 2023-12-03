import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prismaClientInstance";

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getIngredients();
		case "POST":
			return createIngredient();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getIngredients() {
		try {
			const allIngredients = await prisma.ingredients.findMany({
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

			res.status(200).json({
				success: true,
				data: allIngredients,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createIngredient() {
		try {
			const { ingredient_name } = req.body;

			if (!ingredient_name) {
				return res.status(400).json({
					success: false,
					error: "Could not create ingredient, name parameter is missing.",
				});
			}

			const createdIngredient = await prisma.ingredients.create({
				data: {
					ingredient_id: generateGuid(),
					ingredient_name,
				},
			});

			res.status(201).json({
				success: true,
				data: createdIngredient,
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
