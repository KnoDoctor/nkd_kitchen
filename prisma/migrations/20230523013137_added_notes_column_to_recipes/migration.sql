-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "notes" JSONB NOT NULL DEFAULT '[]';
