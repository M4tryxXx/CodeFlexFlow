-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Invites` DROP FOREIGN KEY `Invites_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Qualification` DROP FOREIGN KEY `Qualification_userId_fkey`;

-- DropIndex
DROP INDEX `inviteId_name_key` ON `inviteId`;

-- AddForeignKey
ALTER TABLE `Qualification` ADD CONSTRAINT `Qualification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invites` ADD CONSTRAINT `Invites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
