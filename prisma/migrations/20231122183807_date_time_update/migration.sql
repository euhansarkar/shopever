/*
  Warnings:

  - You are about to drop the column `customerAddressId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `metaSEOId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `targetCouponProductId` on the `CouponProduct` table. All the data in the column will be lost.
  - You are about to drop the column `customerInfoId` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `metaSEOId` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `MetaSEO` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductAttributeOption` table. All the data in the column will be lost.
  - You are about to drop the column `productAttributeOptionId` on the `ProductAttributeOptionValue` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `TargetCouponProduct` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactNo` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `managementDepartmentId` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `names` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `names` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `names` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AttributeGroupCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AttributeOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CMS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CouponCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CouponProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CustomerInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Keyword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `MetaSEO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductAttributeOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductAttributeOptionValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `RequiredCouponProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ShippingMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TargetCouponProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserCouponCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `VarientGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_no` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `management_department_id` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanent_address` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present_address` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `names` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `names` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `names` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_customerAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_metaSEOId_fkey";

-- DropForeignKey
ALTER TABLE "CouponProduct" DROP CONSTRAINT "CouponProduct_targetCouponProductId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_customerInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_metaSEOId_fkey";

-- DropForeignKey
ALTER TABLE "MetaSEO" DROP CONSTRAINT "MetaSEO_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeOption" DROP CONSTRAINT "ProductAttributeOption_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeOptionValue" DROP CONSTRAINT "ProductAttributeOptionValue_productAttributeOptionId_fkey";

-- DropForeignKey
ALTER TABLE "TargetCouponProduct" DROP CONSTRAINT "TargetCouponProduct_couponId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_managementDepartmentId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "customerAddressId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_address_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AttributeGroupCode" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AttributeOption" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CMS" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "metaSEOId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meta_SEO_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CouponCondition" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CouponProduct" DROP COLUMN "targetCouponProductId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "target_coupon_product_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CustomerAddress" DROP COLUMN "customerInfoId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_info_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CustomerInfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "categoryId",
DROP COLUMN "productId",
ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "metaSEOId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meta_SEO_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MetaSEO" DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductAttributeOption" DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductAttributeOptionValue" DROP COLUMN "productAttributeOptionId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_attribute_option_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RequiredCouponProduct" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ShippingMethod" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TargetCouponProduct" DROP COLUMN "couponId",
ADD COLUMN     "coupon_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserCouponCondition" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VarientGroup" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "emergencyContactNo",
DROP COLUMN "managementDepartmentId",
DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
DROP COLUMN "profileImage",
ADD COLUMN     "emergency_contact_no" TEXT NOT NULL,
ADD COLUMN     "management_department_id" TEXT NOT NULL,
ADD COLUMN     "permanent_address" TEXT NOT NULL,
ADD COLUMN     "present_address" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT;

-- AlterTable
ALTER TABLE "names" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_management_department_id_fkey" FOREIGN KEY ("management_department_id") REFERENCES "management_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_meta_SEO_id_fkey" FOREIGN KEY ("meta_SEO_id") REFERENCES "MetaSEO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaSEO" ADD CONSTRAINT "MetaSEO_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_meta_SEO_id_fkey" FOREIGN KEY ("meta_SEO_id") REFERENCES "MetaSEO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeOption" ADD CONSTRAINT "ProductAttributeOption_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeOptionValue" ADD CONSTRAINT "ProductAttributeOptionValue_product_attribute_option_id_fkey" FOREIGN KEY ("product_attribute_option_id") REFERENCES "ProductAttributeOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customer_info_id_fkey" FOREIGN KEY ("customer_info_id") REFERENCES "CustomerInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customer_address_id_fkey" FOREIGN KEY ("customer_address_id") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetCouponProduct" ADD CONSTRAINT "TargetCouponProduct_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponProduct" ADD CONSTRAINT "CouponProduct_target_coupon_product_id_fkey" FOREIGN KEY ("target_coupon_product_id") REFERENCES "TargetCouponProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
