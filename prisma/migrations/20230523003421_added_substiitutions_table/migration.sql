-- CreateTable
CREATE TABLE "ingredient_substitutions" (
    "substituting_ingredient_id" UUID NOT NULL,
    "substituted_ingredient_id" UUID NOT NULL,
    "substituting_quantity" DOUBLE PRECISION NOT NULL,
    "substituted_quantity" DOUBLE PRECISION NOT NULL,
    "additional_info" TEXT,

    CONSTRAINT "ingredient_substitutions_pkey" PRIMARY KEY ("substituting_ingredient_id","substituted_ingredient_id")
);

-- AddForeignKey
ALTER TABLE "ingredient_substitutions" ADD CONSTRAINT "ingredient_substitutions_substituting_ingredient_id_fkey" FOREIGN KEY ("substituting_ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_substitutions" ADD CONSTRAINT "ingredient_substitutions_substituted_ingredient_id_fkey" FOREIGN KEY ("substituted_ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
