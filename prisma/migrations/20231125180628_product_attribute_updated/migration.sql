-- AlterTable
ALTER TABLE "ProductAttribute" ADD COLUMN     "is_deleted" BOOLEAN;

-- AlterTable
ALTER TABLE "ProductAttributeValue" ADD COLUMN     "is_deleted" BOOLEAN;
