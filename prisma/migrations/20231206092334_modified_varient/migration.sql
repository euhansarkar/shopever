/*
  Warnings:

  - You are about to drop the column `qty` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Product` table. All the data in the column will be lost.
  - The `manage_stock` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stock_availability` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProductAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductAttributeValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeValue" DROP CONSTRAINT "ProductAttributeValue_attribute_option_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttributeValue" DROP CONSTRAINT "ProductAttributeValue_product_attribute_id_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "varient_id" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "qty",
DROP COLUMN "short_description",
DROP COLUMN "status",
DROP COLUMN "visibility",
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "weight" SET DEFAULT 0,
DROP COLUMN "manage_stock",
ADD COLUMN     "manage_stock" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "stock_availability",
ADD COLUMN     "stock_availability" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "tax_class" SET DEFAULT false;

-- DropTable
DROP TABLE "ProductAttribute";

-- DropTable
DROP TABLE "ProductAttributeValue";

-- CreateTable
CREATE TABLE "Varient" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "product_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Varient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VarientOption" (
    "id" TEXT NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,

    CONSTRAINT "VarientOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Varient_sku_key" ON "Varient"("sku");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_varient_id_fkey" FOREIGN KEY ("varient_id") REFERENCES "Varient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Varient" ADD CONSTRAINT "Varient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
