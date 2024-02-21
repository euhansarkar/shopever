import { ADMIN_COUNT } from '../seeder/_constraint';
import prisma from '../src/shared/prisma';
import { AdminSeeder } from '../seeder/modules/admin';
import { AttributeGroupSeeder } from '../seeder/modules/attributeGroup';
import { AttributeSeeder } from '../seeder/modules/attribute';
import { CategorySeeder } from '../seeder/modules/category';
import { ProductSeeder } from '../seeder/modules/product';



async function main() {


    // admin creation 
    await AdminSeeder.getAdmin(ADMIN_COUNT);
    // attribute group creation
    await AttributeGroupSeeder.getAttributeGroup();
    // attribute creation
    await AttributeSeeder.getAttribute();
    // category creation
    await CategorySeeder.getCategory();
    // product creation
    await ProductSeeder.getProduct();


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
