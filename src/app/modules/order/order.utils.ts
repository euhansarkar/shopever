// import prisma from "../../../shared/prisma";

// // Admin ID
// export const findLastOrderNumber = async (): Promise<string | undefined> => {
//     const lastOrder = await prisma.order.findFirst({
//         where: {
//             role: 'admin',
//         },
//         select: {
//             id: true,
//         },
//         orderBy: {
//             created_at: "desc"
//         },
//     });

//     return lastOrder?.id ? lastOrder.id.substring(2) : undefined;
// };
