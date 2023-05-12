import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getProspects();
		case "POST":
			return createProspect();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getProspects() {
		try {
			const allProspects = await prisma.prospects.findMany({
				include: {
					person: true,
				},
			});

			res.status(200).json({
				success: true,
				data: allProspects,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createProspect() {
		try {
			const { prospect_sales_funnel_stage, person_id } = req.body;

			if (!prospect_sales_funnel_stage) {
				return res.status(400).json({
					success: false,
					error: "Could not create prospect, prospect sales funnel stage parameter is missing.",
				});
			}

			// if (!email) {
			// 	return res.status(400).json({
			// 		success: false,
			// 		error: "Could not create prospect, email parameter is missing.",
			// 	});
			// }

			const createdProspect = await prisma.prospects.create({
				data: {
					prospect_id: generateGuid(),
					prospect_sales_funnel_stage: parseInt(prospect_sales_funnel_stage),
					person_id,
				},
			});

			res.status(201).json({
				success: true,
				data: createdProspect,
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
