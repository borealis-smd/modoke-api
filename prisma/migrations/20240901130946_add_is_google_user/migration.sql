-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "is_google_user" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
