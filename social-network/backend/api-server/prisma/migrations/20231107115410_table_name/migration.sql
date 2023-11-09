/*
  Warnings:

  - You are about to drop the `UserFriend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFriend" DROP CONSTRAINT "UserFriend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "UserFriend" DROP CONSTRAINT "UserFriend_userId_fkey";

-- DropTable
DROP TABLE "UserFriend";

-- CreateTable
CREATE TABLE "user_friend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_friend" ADD CONSTRAINT "user_friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_friend" ADD CONSTRAINT "user_friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
