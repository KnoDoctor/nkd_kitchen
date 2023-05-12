import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let prospect_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(prospect_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getProspect();
		case "PATCH":
			return updateProspect();
		case "DELETE":
			return deleteProspect();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getProspect() {
		try {
			let prospect;

			prospect = await prisma.prospects.findUnique({
				where: {
					prospect_id,
				},
				include: {
					person: true,
				},
			});

			if (prospect) {
				res.status(200).json({
					success: true,
					data: prospect,
				});
			} else {
				res.status(404).json({
					success: false,
					data: prospect,
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

	async function updateProspect() {
		try {
			const { prospect_sales_funnel_stage } = req.body;

			const patchedPost = await prisma.prospects.update({
				where: {
					prospect_id,
				},
				data: {
					prospect_sales_funnel_stage,
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

	async function deleteProspect() {
		try {
			const deletedPost = await prisma.prospects.delete({
				where: {
					prospect_id,
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
