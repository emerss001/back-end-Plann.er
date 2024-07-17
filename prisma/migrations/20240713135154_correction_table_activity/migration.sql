/*
  Warnings:

  - You are about to drop the column `tripId` on the `activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `activities` DROP FOREIGN KEY `activities_tripId_fkey`;

-- AlterTable
ALTER TABLE `activities` DROP COLUMN `tripId`;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
