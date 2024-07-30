/*
  Warnings:

  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_username_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "username",
ADD COLUMN     "Name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Name_key" ON "Employee"("Name");
