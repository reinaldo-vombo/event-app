-- DropForeignKey
ALTER TABLE `guest` DROP FOREIGN KEY `Guest_eventId_fkey`;

-- DropIndex
DROP INDEX `Guest_eventId_fkey` ON `guest`;

-- AlterTable
ALTER TABLE `guest` MODIFY `eventId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
