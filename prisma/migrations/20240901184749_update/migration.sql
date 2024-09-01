/*
  Warnings:

  - Added the required column `city` to the `user_experiences` table without a default value. This is not possible if the table is not empty.
  - Made the column `city` on table `user_qualifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_experiences` ADD COLUMN `city` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_qualifications` MODIFY `city` VARCHAR(191) NOT NULL;
