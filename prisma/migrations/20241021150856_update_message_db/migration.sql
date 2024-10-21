/*
  Warnings:

  - You are about to drop the column `notification` on the `user_notifications` table. All the data in the column will be lost.
  - Added the required column `message` to the `user_notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `user_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_notifications` DROP COLUMN `notification`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NULL;
