/*
  Warnings:

  - You are about to drop the column `bloodGroup` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `userCouponConditionId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contact_no]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_no` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_id` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_id` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_nameId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_nameId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userCouponConditionId_fkey";

-- DropIndex
DROP INDEX "admins_contactNo_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "bloodGroup",
DROP COLUMN "contactNo",
DROP COLUMN "dateOfBirth",
DROP COLUMN "nameId",
ADD COLUMN     "blood_group" TEXT,
ADD COLUMN     "contact_no" TEXT NOT NULL,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "name_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "nameId",
ADD COLUMN     "name_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userCouponConditionId",
ADD COLUMN     "user_coupon_condition_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "admins_contact_no_key" ON "admins"("contact_no");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_coupon_condition_id_fkey" FOREIGN KEY ("user_coupon_condition_id") REFERENCES "UserCouponCondition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
