/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient_name` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_name` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "name",
ADD COLUMN     "ingredient_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "title",
ADD COLUMN     "recipe_name" TEXT NOT NULL;
