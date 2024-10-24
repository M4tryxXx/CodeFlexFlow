/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user_personal_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_socials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_personal_info_user_id_key` ON `user_personal_info`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_socials_user_id_key` ON `user_socials`(`user_id`);
