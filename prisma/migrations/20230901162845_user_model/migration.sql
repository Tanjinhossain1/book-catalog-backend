-- CreateEnum
CREATE TYPE "AllUserRoles" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AllUserRoles" NOT NULL,
    "contactNo" TEXT,
    "address" TEXT,
    "profileImg" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
