-- CreateTable
CREATE TABLE "people" (
    "person_id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "people_pkey" PRIMARY KEY ("person_id")
);
