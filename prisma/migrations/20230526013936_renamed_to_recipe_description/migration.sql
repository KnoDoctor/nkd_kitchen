/*
  Warnings:

  - You are about to drop the column `description` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "description",
ADD COLUMN     "recipe_description" TEXT;
