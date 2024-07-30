-- CreateEnum
CREATE TYPE "Menu" AS ENUM ('NORMAL', 'NEWYEAR', 'SPECIAL', 'DRINKS', 'DESSERTS');

-- CreateEnum
CREATE TYPE "Options" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK');

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "menu" "Menu" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" "Options" NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
