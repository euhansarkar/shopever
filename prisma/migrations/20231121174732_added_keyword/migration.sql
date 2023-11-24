/*
  Warnings:

  - You are about to drop the column `meta_keywords` on the `MetaSEO` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MetaSEO" DROP COLUMN "meta_keywords";

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metaSEOId" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_metaSEOId_fkey" FOREIGN KEY ("metaSEOId") REFERENCES "MetaSEO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
