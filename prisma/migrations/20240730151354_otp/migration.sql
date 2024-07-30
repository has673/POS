-- DropIndex
DROP INDEX "Employee_Name_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "salary" DROP NOT NULL,
ALTER COLUMN "Phonenumber" DROP NOT NULL,
ALTER COLUMN "dateofbirth" DROP NOT NULL,
ALTER COLUMN "Starttime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "OTP" INTEGER,
ADD COLUMN     "verified" BOOLEAN DEFAULT false;
