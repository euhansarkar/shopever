-- CreateTable
CREATE TABLE "varient_products" (
    "id" TEXT NOT NULL,
    "attribute_id" TEXT NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "varient_id" TEXT NOT NULL,
    "ordered_product_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "varient_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordered_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "varient_products" ADD CONSTRAINT "varient_products_ordered_product_id_fkey" FOREIGN KEY ("ordered_product_id") REFERENCES "ordered_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
