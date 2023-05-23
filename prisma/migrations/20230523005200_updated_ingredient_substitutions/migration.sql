/*
  Warnings:

  - Added the required column `substituted_unit` to the `ingredient_substitutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substituting_unit` to the `ingredient_substitutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredient_substitutions" ADD COLUMN     "substituted_unit" TEXT NOT NULL,
ADD COLUMN     "substituting_unit" TEXT NOT NULL;
