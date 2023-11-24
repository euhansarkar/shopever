/*
  Warnings:

  - You are about to drop the column `attributeId` on the `AttributeGroupCode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttributeGroupCode" DROP CONSTRAINT "AttributeGroupCode_attributeId_fkey";

-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "attribute_group_id" TEXT;

-- AlterTable
ALTER TABLE "AttributeGroupCode" DROP COLUMN "attributeId";

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_attribute_group_id_fkey" FOREIGN KEY ("attribute_group_id") REFERENCES "AttributeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
