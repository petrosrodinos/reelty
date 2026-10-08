-- Which built-in soundtrack a project uses (existing projects keep the original ambient track).
ALTER TABLE "projects" ADD COLUMN "soundtrack_id" TEXT NOT NULL DEFAULT 'ambient';
