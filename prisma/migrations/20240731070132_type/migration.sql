/*
  Warnings:

  - You are about to alter the column `Phonenumber` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "Phonenumber" SET DATA TYPE INTEGER;
