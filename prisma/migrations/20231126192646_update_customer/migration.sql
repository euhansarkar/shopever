/*
  Warnings:

  - You are about to drop the column `customer_info_id` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the `CustomerInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_customer_info_id_fkey";

-- AlterTable
ALTER TABLE "CustomerAddress" DROP COLUMN "customer_info_id";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "contact_no" TEXT,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profile_image" TEXT;

-- DropTable
DROP TABLE "CustomerInfo";
