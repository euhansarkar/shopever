-- CreateTable
CREATE TABLE `users` (
    `uid` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `needsPasswordChange` BOOLEAN NULL DEFAULT true,
    `passwordChangeAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NULL,
    `adminId` VARCHAR(191) NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_semesters` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `startMonth` VARCHAR(191) NOT NULL,
    `endMonth` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_faculties` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_departments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `academicFacultyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `uid` VARCHAR(191) NOT NULL,
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

    UNIQUE INDEX `students_id_key`(`id`),
    UNIQUE INDEX `students_email_key`(`email`),
    UNIQUE INDEX `students_contactNo_key`(`contactNo`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculties` (
    `uid` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `nameId` VARCHAR(191) NOT NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `bloodGroup` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `emergencyContactNo` VARCHAR(191) NOT NULL,
    `presentAddress` VARCHAR(191) NOT NULL,
    `permanentAddress` VARCHAR(191) NOT NULL,
    `academicDepartmentId` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `academicFacultyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `faculties_id_key`(`id`),
    UNIQUE INDEX `faculties_email_key`(`email`),
    UNIQUE INDEX `faculties_contactNo_key`(`contactNo`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `management_departments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `management_departments_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `uid` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `nameId` VARCHAR(191) NOT NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `bloodGroup` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `emergencyContactNo` VARCHAR(191) NOT NULL,
    `presentAddress` VARCHAR(191) NOT NULL,
    `permanentAddress` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `managementDepartmentId` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admins_id_key`(`id`),
    UNIQUE INDEX `admins_email_key`(`email`),
    UNIQUE INDEX `admins_contactNo_key`(`contactNo`),
    PRIMARY KEY (`uid`)
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
CREATE TABLE `listing_statuses` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_types` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `countries_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cities_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coordinates` (
    `id` VARCHAR(191) NOT NULL,
    `lattitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_addresses` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `zipCode` INTEGER NOT NULL,
    `coordinateId` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rent_properties` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apartments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `structures` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `apartmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_features` (
    `id` VARCHAR(191) NOT NULL,
    `bedRooms` INTEGER NOT NULL,
    `bathRooms` INTEGER NOT NULL,
    `squreFootage` INTEGER NOT NULL,
    `lotSize` INTEGER NOT NULL,
    `yearBuild` INTEGER NOT NULL,
    `garage` BOOLEAN NOT NULL,
    `garageCapacity` INTEGER NOT NULL,
    `swimingPool` INTEGER NOT NULL,
    `firePlace` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `structureId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `sqft` DOUBLE NOT NULL,
    `availableDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `apartmentId` VARCHAR(191) NOT NULL,
    `structureId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `floor_plan_images` (
    `id` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `structureId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenities` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` VARCHAR(191) NULL,
    `structureId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `faculties`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admins`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `academic_departments` ADD CONSTRAINT `academic_departments_academicFacultyId_fkey` FOREIGN KEY (`academicFacultyId`) REFERENCES `academic_faculties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `faculties` ADD CONSTRAINT `faculties_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `names`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculties` ADD CONSTRAINT `faculties_academicDepartmentId_fkey` FOREIGN KEY (`academicDepartmentId`) REFERENCES `academic_departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculties` ADD CONSTRAINT `faculties_academicFacultyId_fkey` FOREIGN KEY (`academicFacultyId`) REFERENCES `academic_faculties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `names`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_managementDepartmentId_fkey` FOREIGN KEY (`managementDepartmentId`) REFERENCES `management_departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_addresses` ADD CONSTRAINT `property_addresses_coordinateId_fkey` FOREIGN KEY (`coordinateId`) REFERENCES `coordinates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_addresses` ADD CONSTRAINT `property_addresses_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `rent_properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_addresses` ADD CONSTRAINT `property_addresses_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apartments` ADD CONSTRAINT `apartments_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `rent_properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `structures` ADD CONSTRAINT `structures_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_features` ADD CONSTRAINT `property_features_structureId_fkey` FOREIGN KEY (`structureId`) REFERENCES `structures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `units_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `units_structureId_fkey` FOREIGN KEY (`structureId`) REFERENCES `structures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `floor_plan_images` ADD CONSTRAINT `floor_plan_images_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `rent_properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `floor_plan_images` ADD CONSTRAINT `floor_plan_images_structureId_fkey` FOREIGN KEY (`structureId`) REFERENCES `structures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `amenities` ADD CONSTRAINT `amenities_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `rent_properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `amenities` ADD CONSTRAINT `amenities_structureId_fkey` FOREIGN KEY (`structureId`) REFERENCES `structures`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
