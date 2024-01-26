-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_address_Id_fkey";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "address_Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_address_Id_fkey" FOREIGN KEY ("address_Id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
