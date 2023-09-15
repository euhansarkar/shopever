/*
  Warnings:

  - Added the required column `needsPasswordChange` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordChangeAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `adminId` VARCHAR(191) NULL,
    ADD COLUMN `facultyId` VARCHAR(191) NULL,
    ADD COLUMN `needsPasswordChange` BOOLEAN NOT NULL,
    ADD COLUMN `passwordChangeAt` DATETIME(3) NOT NULL,
    ADD COLUMN `studentId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `nameId` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `emergencyContactNo` VARCHAR(191) NOT NULL,
    `bloodGroup` VARCHAR(191) NULL,
    `presentAddress` VARCHAR(191) NOT NULL,
    `permanentAddress` VARCHAR(191) NOT NULL,
    `guardianId` VARCHAR(191) NOT NULL,
    `localGuardianId` VARCHAR(191) NOT NULL,
    `academicFacultyId` VARCHAR(191) NOT NULL,
    `academicDepartmentId` VARCHAR(191) NOT NULL,
    `academicSemesterId` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_email_key`(`email`),
    UNIQUE INDEX `students_contactNo_key`(`contactNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `names` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guardians` (
    `id` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `fatherOccupation` VARCHAR(191) NOT NULL,
    `fatherContactNo` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `motherOccupation` VARCHAR(191) NOT NULL,
    `motherContactNo` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `local_guardians` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculties` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `faculties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `names`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_guardianId_fkey` FOREIGN KEY (`guardianId`) REFERENCES `guardians`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_localGuardianId_fkey` FOREIGN KEY (`localGuardianId`) REFERENCES `local_guardians`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_academicFacultyId_fkey` FOREIGN KEY (`academicFacultyId`) REFERENCES `academic_faculties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_academicDepartmentId_fkey` FOREIGN KEY (`academicDepartmentId`) REFERENCES `academic_departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_academicSemesterId_fkey` FOREIGN KEY (`academicSemesterId`) REFERENCES `academic_semesters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
