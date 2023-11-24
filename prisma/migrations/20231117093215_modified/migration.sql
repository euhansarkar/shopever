-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('home', 'office');

-- CreateEnum
CREATE TYPE "CMSLayout" AS ENUM ('onColumn', 'twoColumnsLeft', 'twoColumnsRight', 'threeColumns');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userCouponConditionId" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "include_in_nav" BOOLEAN NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaSEO" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "meta_keywords" TEXT NOT NULL,
    "url_key" TEXT NOT NULL,
    "categoryId" TEXT,
    "productId" TEXT,
    "cMSId" TEXT,

    CONSTRAINT "MetaSEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "categoryId" TEXT,
    "productId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeGroup" (
    "id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,
    "varient_group_id" TEXT,

    CONSTRAINT "AttributeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "attribute_code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL,
    "display_on_frontend" BOOLEAN NOT NULL,
    "sort_order" BOOLEAN NOT NULL,
    "is_filterable" BOOLEAN NOT NULL,
    "varientGroupId" TEXT,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeGroupCode" (
    "id" TEXT NOT NULL,
    "attribute_group_id" TEXT NOT NULL,
    "attributeId" TEXT,

    CONSTRAINT "AttributeGroupCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeOption" (
    "id" TEXT NOT NULL,
    "attributeId" TEXT,

    CONSTRAINT "AttributeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VarientGroup" (
    "id" TEXT NOT NULL,

    CONSTRAINT "VarientGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "weight" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "manage_stock" TEXT NOT NULL,
    "stock_availability" TEXT NOT NULL,
    "tax_class" BOOLEAN NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "attribute_group_id" TEXT,
    "category_id" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAttribute" (
    "id" TEXT NOT NULL,
    "attribute_code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAttributeOption" (
    "id" TEXT NOT NULL,
    "option_name" TEXT NOT NULL,
    "option_type" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductAttributeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAttributeOptionValue" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productAttributeOptionId" TEXT,

    CONSTRAINT "ProductAttributeOptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerInfo" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "CustomerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" TEXT NOT NULL,
    "type" "AddressType" NOT NULL,
    "customerInfoId" TEXT,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "customerAddressId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" TEXT NOT NULL,
    "method_name" TEXT NOT NULL,
    "method_code" TEXT NOT NULL,

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "method_name" TEXT NOT NULL,
    "method_code" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "discount_amount" INTEGER NOT NULL,
    "free_shipping" BOOLEAN NOT NULL,
    "discount_type" TEXT NOT NULL,
    "coupon" TEXT NOT NULL,
    "used_time" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "user_condition" TEXT NOT NULL,
    "buyx_gety" TEXT NOT NULL,
    "max_uses_time_per_coupon" TEXT NOT NULL,
    "max_uses_time_per_customer" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetCouponProduct" (
    "id" TEXT NOT NULL,
    "maxQTy" INTEGER NOT NULL,
    "couponId" TEXT,

    CONSTRAINT "TargetCouponProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponProduct" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "targetCouponProductId" TEXT,

    CONSTRAINT "CouponProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponCondition" (
    "id" TEXT NOT NULL,
    "order_total" INTEGER NOT NULL,
    "order_qty" INTEGER NOT NULL,

    CONSTRAINT "CouponCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredCouponProduct" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "RequiredCouponProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCouponCondition" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "parchased" INTEGER NOT NULL,

    CONSTRAINT "UserCouponCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CMS" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "layout" "CMSLayout" NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CMS_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userCouponConditionId_fkey" FOREIGN KEY ("userCouponConditionId") REFERENCES "UserCouponCondition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaSEO" ADD CONSTRAINT "MetaSEO_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaSEO" ADD CONSTRAINT "MetaSEO_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaSEO" ADD CONSTRAINT "MetaSEO_cMSId_fkey" FOREIGN KEY ("cMSId") REFERENCES "CMS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeGroup" ADD CONSTRAINT "AttributeGroup_varient_group_id_fkey" FOREIGN KEY ("varient_group_id") REFERENCES "VarientGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_varientGroupId_fkey" FOREIGN KEY ("varientGroupId") REFERENCES "VarientGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeGroupCode" ADD CONSTRAINT "AttributeGroupCode_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeOption" ADD CONSTRAINT "AttributeOption_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_attribute_group_id_fkey" FOREIGN KEY ("attribute_group_id") REFERENCES "AttributeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeOption" ADD CONSTRAINT "ProductAttributeOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeOptionValue" ADD CONSTRAINT "ProductAttributeOptionValue_productAttributeOptionId_fkey" FOREIGN KEY ("productAttributeOptionId") REFERENCES "ProductAttributeOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerInfoId_fkey" FOREIGN KEY ("customerInfoId") REFERENCES "CustomerInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerAddressId_fkey" FOREIGN KEY ("customerAddressId") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetCouponProduct" ADD CONSTRAINT "TargetCouponProduct_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponProduct" ADD CONSTRAINT "CouponProduct_targetCouponProductId_fkey" FOREIGN KEY ("targetCouponProductId") REFERENCES "TargetCouponProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
