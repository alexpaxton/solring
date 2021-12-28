/*
  Warnings:

  - The primary key for the `Deck` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Deck` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL DEFAULT '',
    ALTER COLUMN `creatorId` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);
