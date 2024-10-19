-- CreateTable
CREATE TABLE "Post" (
    "idPost" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("idPost")
);

-- CreateTable
CREATE TABLE "PostSection" (
    "idPostSection" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "content" VARCHAR(800) NOT NULL,

    CONSTRAINT "PostSection_pkey" PRIMARY KEY ("idPostSection")
);

-- CreateTable
CREATE TABLE "NewsLetter" (
    "idNewsLetter" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "NewsLetter_pkey" PRIMARY KEY ("idNewsLetter")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "idEvenement" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" VARCHAR(800) NOT NULL,
    "image" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("idEvenement")
);

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;
