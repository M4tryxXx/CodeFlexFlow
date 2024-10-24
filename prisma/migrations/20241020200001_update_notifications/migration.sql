/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_notifications` table. All the data in the column will be lost.
  - Added the required column `from_user_id` to the `user_notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user_id` to the `user_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_notifications` DROP FOREIGN KEY `user_notifications_user_id_fkey`;

-- AlterTable
ALTER TABLE `user_notifications` DROP COLUMN `user_id`,
    ADD COLUMN `from_user_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `to_user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Notification_from_user_id_fkey` ON `user_notifications`(`from_user_id`);

-- CreateIndex
CREATE INDEX `Notification_to_user_id_fkey` ON `user_notifications`(`to_user_id`);

-- AddForeignKey
ALTER TABLE `user_notifications` ADD CONSTRAINT `user_notifications_from_user_id_fkey` FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_notifications` ADD CONSTRAINT `user_notifications_to_user_id_fkey` FOREIGN KEY (`to_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
