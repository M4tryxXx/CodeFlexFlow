/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `inviteId` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `inviteId_name_key` ON `inviteId`(`name`);
