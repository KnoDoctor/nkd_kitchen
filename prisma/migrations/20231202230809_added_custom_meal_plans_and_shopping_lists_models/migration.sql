-- CreateTable
CREATE TABLE "pantry_inventory" (
    "pantry_item_id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "ingredient_id" UUID NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pantry_inventory_pkey" PRIMARY KEY ("pantry_item_id")
);

-- CreateTable
CREATE TABLE "meal_plans" (
    "meal_plan_id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "meals" JSONB NOT NULL DEFAULT '[]',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_plans_pkey" PRIMARY KEY ("meal_plan_id")
);

-- CreateTable
CREATE TABLE "meal_plan_items" (
    "meal_plan_item_id" UUID NOT NULL,
    "meal_plan_id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_plan_items_pkey" PRIMARY KEY ("meal_plan_item_id")
);

-- CreateTable
CREATE TABLE "shopping_lists" (
    "shopping_list_id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "items" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "shopping_lists_pkey" PRIMARY KEY ("shopping_list_id")
);

-- AddForeignKey
ALTER TABLE "pantry_inventory" ADD CONSTRAINT "pantry_inventory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pantry_inventory" ADD CONSTRAINT "pantry_inventory_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plans" ADD CONSTRAINT "meal_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_items" ADD CONSTRAINT "meal_plan_items_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "meal_plans"("meal_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_items" ADD CONSTRAINT "meal_plan_items_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_lists" ADD CONSTRAINT "shopping_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
