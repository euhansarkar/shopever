/*
  Warnings:

  - You are about to drop the column `product_id` on the `MetaSEO` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_code` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the `ProductAttributeOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductAttributeOptionValue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[attribute_id]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meta_SEO_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `weight` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `qty` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `manage_stock` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stock_availability` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `attribute_id` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MetaSEO" DROP CONSTRAINT "MetaSEO_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeOption" DROP CONSTRAINT "ProductAttributeOption_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeOptionValue" DROP CONSTRAINT "ProductAttributeOptionValue_product_attribute_option_id_fkey";

-- AlterTable
ALTER TABLE "MetaSEO" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "meta_SEO_id" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
DROP COLUMN "qty",
ADD COLUMN     "qty" INTEGER NOT NULL,
DROP COLUMN "manage_stock",
ADD COLUMN     "manage_stock" INTEGER NOT NULL,
DROP COLUMN "stock_availability",
ADD COLUMN     "stock_availability" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "attribute_code",
DROP COLUMN "value",
ADD COLUMN     "attribute_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductAttributeOption";

-- DropTable
DROP TABLE "ProductAttributeOptionValue";

-- CreateTable
CREATE TABLE "ProductAttributeValue" (
    "id" TEXT NOT NULL,
    "product_attribute_id" TEXT NOT NULL,
    "attribute_option_id" TEXT NOT NULL,
    "extra_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_attribute_option_id_key" ON "ProductAttributeValue"("attribute_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_attribute_id_key" ON "ProductAttribute"("attribute_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_meta_SEO_id_fkey" FOREIGN KEY ("meta_SEO_id") REFERENCES "MetaSEO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_product_attribute_id_fkey" FOREIGN KEY ("product_attribute_id") REFERENCES "ProductAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_attribute_option_id_fkey" FOREIGN KEY ("attribute_option_id") REFERENCES "AttributeOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
