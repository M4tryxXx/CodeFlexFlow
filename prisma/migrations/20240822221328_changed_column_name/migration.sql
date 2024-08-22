/*
  Warnings:

  - You are about to drop the column `verifiyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifiyTokenExpiry` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verifyToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_verifiyToken_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `verifiyToken`,
    DROP COLUMN `verifiyTokenExpiry`,
    ADD COLUMN `verifyToken` VARCHAR(191) NULL,
    ADD COLUMN `verifyTokenExpiry` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_verifyToken_key` ON `User`(`verifyToken`);
