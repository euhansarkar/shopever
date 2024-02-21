import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAdmin(adminCount: number) {
    const managementDepartment = await prisma.managementDepartment.create({
        data: { title: faker.person.jobType() }
    })

    for (let i = 0; i < adminCount; i++) {

        const name = await prisma.name.create({
            data: {
                first_name: faker.person.firstName(),
                middle_name: faker.person.firstName(),
                last_name: faker.person.lastName()
            }
        });

        enum BloodGroup { APlus = "A+", AMinus = "A-", BPlus = "B+", BMinus = "B-", ABPlus = "AB+", ABMinus = "AB-", OPlus = "O+", OMinus = "O-" }

        const admin = await prisma.admin.create({
            data: {
                gender: faker.person.sexType(),
                date_of_birth: faker.date.birthdate({ min: 1900, max: 2000, mode: 'year' }).toISOString(),
                contact_no: faker.phone.number(),
                emergency_contact_no: faker.phone.number(),
                blood_group: faker.helpers.enumValue(BloodGroup),
                present_address: faker.location.streetAddress(),
                permanent_address: faker.location.streetAddress(),
                designation: "Administrator",
                management_department_id: managementDepartment?.id,
                name_id: name?.id,
                profile_image: faker.image.avatar(),
                id: faker.string.uuid(),

            }
        })

        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: "123456",
                admin_id: admin?.uid,
                role: "admin",
                id: faker.string.uuid(),
            }
        })

        const users = await prisma.user.findMany();

    }

}

export const AdminSeeder = { getAdmin };