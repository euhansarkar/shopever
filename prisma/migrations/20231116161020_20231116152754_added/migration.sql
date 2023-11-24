-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "needs_password_change" BOOLEAN DEFAULT true,
    "password_change_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "admin_id" TEXT,
    "customer_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "management_departments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "management_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "uid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "admins" (
    "uid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "gender" TEXT,
    "bloodGroup" TEXT,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "managementDepartmentId" TEXT NOT NULL,
    "profileImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "names" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,

    CONSTRAINT "names_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "management_departments_title_key" ON "management_departments"("title");

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_id_key" ON "admins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_contactNo_key" ON "admins"("contactNo");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_managementDepartmentId_fkey" FOREIGN KEY ("managementDepartmentId") REFERENCES "management_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
