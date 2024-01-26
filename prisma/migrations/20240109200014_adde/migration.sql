/*
  Warnings:

  - You are about to drop the column `address_1` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `address_2` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `customer_addresses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order_number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_1` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_2` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_Id` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingAddressId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddressId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingMethodId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_customer_address_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_addresses" DROP CONSTRAINT "customer_addresses_customer_Uid_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "address_1",
DROP COLUMN "address_2",
ADD COLUMN     "location_1" TEXT NOT NULL,
ADD COLUMN     "location_2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "address_Id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "billingAddressId" TEXT NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ADD COLUMN     "shippingAddressId" TEXT NOT NULL,
ADD COLUMN     "shippingMethodId" TEXT NOT NULL;

-- DropTable
DROP TABLE "customer_addresses";

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number_1" TEXT NOT NULL,
    "phone_number_2" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_addresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number_1" TEXT NOT NULL,
    "phone_number_2" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_address_Id_fkey" FOREIGN KEY ("address_Id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "shipping_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "billing_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
