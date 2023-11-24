/*
  Warnings:

  - You are about to drop the column `varientGroupId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `attributeId` on the `AttributeOption` table. All the data in the column will be lost.
  - Added the required column `attribute_id` to the `AttributeOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_text` to the `AttributeOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_varientGroupId_fkey";

-- DropForeignKey
ALTER TABLE "AttributeOption" DROP CONSTRAINT "AttributeOption_attributeId_fkey";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "varientGroupId";

-- AlterTable
ALTER TABLE "AttributeOption" DROP COLUMN "attributeId",
ADD COLUMN     "attribute_id" TEXT NOT NULL,
ADD COLUMN     "option_text" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AttributeOption" ADD CONSTRAINT "AttributeOption_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
