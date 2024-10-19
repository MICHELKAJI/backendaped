/*
  Warnings:

  - Added the required column `ville` to the `Donateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donateur" ADD COLUMN     "ville" TEXT NOT NULL;
