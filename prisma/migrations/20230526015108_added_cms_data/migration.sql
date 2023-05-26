-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "cms_data" JSONB NOT NULL DEFAULT '[]';
