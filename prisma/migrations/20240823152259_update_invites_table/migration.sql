/*
  Warnings:

  - You are about to drop the column `invite` on the `Invites` table. All the data in the column will be lost.
  - Added the required column `destinationEmail` to the `Invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Invites_invite_key` ON `Invites`;

-- AlterTable
ALTER TABLE `Invites` DROP COLUMN `invite`,
    ADD COLUMN `destinationEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;
