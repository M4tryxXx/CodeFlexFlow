/*
  Warnings:

  - You are about to drop the column `userUsername` on the `Invites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Invites` DROP COLUMN `userUsername`,
    ADD COLUMN `userUserName` VARCHAR(191) NULL;
