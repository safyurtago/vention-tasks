/*
  Warnings:

  - You are about to drop the column `activation_token` on the `user` table. All the data in the column will be lost.
  - Added the required column `activation_link` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "activation_token",
ADD COLUMN     "activation_link" TEXT NOT NULL;
