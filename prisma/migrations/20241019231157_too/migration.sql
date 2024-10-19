-- CreateTable
CREATE TABLE "Donateur" (
    "idDonateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "Donateur_pkey" PRIMARY KEY ("idDonateur")
);
