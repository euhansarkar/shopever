/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductID` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductID" DROP CONSTRAINT "ProductID_productId_fkey";

-- AlterTable
ALTER TABLE "ProductID" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "VarientOption" ADD COLUMN     "varient_id" TEXT;

-- AddForeignKey
ALTER TABLE "VarientOption" ADD CONSTRAINT "VarientOption_varient_id_fkey" FOREIGN KEY ("varient_id") REFERENCES "Varient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
