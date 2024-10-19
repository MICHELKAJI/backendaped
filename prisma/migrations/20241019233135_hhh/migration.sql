/*
  Warnings:

  - You are about to drop the `Donateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Donateur";

-- CreateTable
CREATE TABLE "Danation" (
    "idDonateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "ville" TEXT NOT NULL,

    CONSTRAINT "Danation_pkey" PRIMARY KEY ("idDonateur")
);
