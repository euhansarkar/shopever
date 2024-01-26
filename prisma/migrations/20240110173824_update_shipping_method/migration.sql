/*
  Warnings:

  - Added the required column `cost` to the `shipping_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipping_methods" ADD COLUMN     "cost" INTEGER NOT NULL;
