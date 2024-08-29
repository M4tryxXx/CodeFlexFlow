/*
  Warnings:

  - You are about to drop the column `streetNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `streetNumber`,
    ADD COLUMN `house` VARCHAR(191) NULL;
