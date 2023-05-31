/*
  Warnings:

  - You are about to drop the `recipe_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe_categories" DROP CONSTRAINT "recipe_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_categories" DROP CONSTRAINT "recipe_categories_recipe_id_fkey";

-- DropTable
DROP TABLE "recipe_categories";

-- CreateTable
CREATE TABLE "recipes_categories" (
    "recipe_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_categories_pkey" PRIMARY KEY ("recipe_id","category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_categories_recipe_id_category_id_key" ON "recipes_categories"("recipe_id", "category_id");

-- AddForeignKey
ALTER TABLE "recipes_categories" ADD CONSTRAINT "recipes_categories_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_categories" ADD CONSTRAINT "recipes_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
