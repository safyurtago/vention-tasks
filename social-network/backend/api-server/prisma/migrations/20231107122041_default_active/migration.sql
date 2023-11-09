/*
  Warnings:

  - You are about to alter the column `views` on the `post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "views" SET DATA TYPE INTEGER;
