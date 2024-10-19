/*
  Warnings:

  - You are about to drop the `Danation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Danation";

-- CreateTable
CREATE TABLE "Donation" (
    "idDonateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "ville" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("idDonateur")
);
