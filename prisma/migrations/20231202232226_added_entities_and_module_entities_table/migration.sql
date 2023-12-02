-- CreateTable
CREATE TABLE "entities" (
    "entity_id" UUID NOT NULL,
    "entity_name" VARCHAR(150) NOT NULL,
    "entity_image" VARCHAR(150),
    "entity_slug" VARCHAR(150) NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("entity_id")
);

-- CreateTable
CREATE TABLE "modules_entities" (
    "modules_entities_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "entity_id" UUID NOT NULL,

    CONSTRAINT "modules_entities_pkey" PRIMARY KEY ("module_id","entity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modules_entities_module_id_entity_id_key" ON "modules_entities"("module_id", "entity_id");

-- AddForeignKey
ALTER TABLE "modules_entities" ADD CONSTRAINT "modules_entities_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules_entities" ADD CONSTRAINT "modules_entities_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "entities"("entity_id") ON DELETE RESTRICT ON UPDATE CASCADE;
