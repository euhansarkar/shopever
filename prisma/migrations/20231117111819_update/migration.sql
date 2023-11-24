/*
  Warnings:

  - You are about to drop the column `varient_group_id` on the `AttributeGroup` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `AttributeGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttributeGroup" DROP CONSTRAINT "AttributeGroup_varient_group_id_fkey";

-- AlterTable
ALTER TABLE "AttributeGroup" DROP COLUMN "varient_group_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
