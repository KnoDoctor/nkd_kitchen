import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getPeople();
        case "POST":
            return createPerson();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getPeople() {
        try {
            const allPeople = await prisma.people.findMany();

            res.status(200).json({
                success: true,
                data: allPeople,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createPerson() {
        try {
            const { person_name } = req.body;

            if (!person_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create person, name parameter is missing.",
                });
            }

            const createdPerson = await prisma.people.create({
                data: {
                    person_id: generateGuid(),
                    person_name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdPerson,
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
