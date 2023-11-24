/*
  Warnings:

  - Made the column `attribute_group_id` on table `Attribute` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_attribute_group_id_fkey";

-- AlterTable
ALTER TABLE "Attribute" ALTER COLUMN "attribute_group_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "AttributeOption" ADD COLUMN     "is_deleted" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_attribute_group_id_fkey" FOREIGN KEY ("attribute_group_id") REFERENCES "AttributeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
