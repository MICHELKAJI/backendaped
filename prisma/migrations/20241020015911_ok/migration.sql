/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `NewsLetter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `PostSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PostSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostSection" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetter_mail_key" ON "NewsLetter"("mail");
