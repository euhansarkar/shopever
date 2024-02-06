import { faker } from '@faker-js/faker';
import { ADMIN_COUNT } from '../seeder/_constraint';
import prisma from '../src/shared/prisma';
import { AdminSeeder } from '../seeder/modules/admin';
import { AttributeGroupSeeder } from '../seeder/modules/attributeGroup';
import { AttributeSeeder } from '../seeder/modules/attribute';
import { CategorySeeder } from '../seeder/modules/category';



async function main() {

    // deleting all previously added data
    // await prisma.user.deleteMany({});

    // deleting all previously management department added data
    // await prisma.managementDepartment.deleteMany({});


    // admin creation 
    await AdminSeeder.getAdmin(ADMIN_COUNT);
    // attribute group creation
    await AttributeGroupSeeder.getAttributeGroup();
    // attribute creation
    await AttributeSeeder.getAttribute();
    // category creation
    await CategorySeeder.getCategory();


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
