-- CreateTable
CREATE TABLE "Actuality" (
    "idActuality" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "image" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actuality_pkey" PRIMARY KEY ("idActuality")
);
