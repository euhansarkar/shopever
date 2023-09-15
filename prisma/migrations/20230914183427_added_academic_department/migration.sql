-- CreateTable
CREATE TABLE `academic_departments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `academicFacultyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `academic_departments` ADD CONSTRAINT `academic_departments_academicFacultyId_fkey` FOREIGN KEY (`academicFacultyId`) REFERENCES `academic_faculties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
