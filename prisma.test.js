import {
    PrismaClient
} from "@prisma/client"

const prisma = new PrismaClient()

prisma.post
    .deleteMany({
        where: {userId: 1},
    })
    .then(() => {
        prisma.user
            .delete({
                where: {id: 1}
            })
            .then(() => console.log("Deleted User id 1"))
    })
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())

// upsert

// prisma.user
//     .upsert({
//         where: {id: 1},
//         update: {name: "Bobby"},
//         create: {name: "Bobby", bio: "Bobby's bio"}
//     })
//     .then(result => console.log(result))
//     .catch(e => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(() => prisma.$disconnect())


// update

// prisma.user.update({
//     where: {id: 1},
//     data: {name: "BOBBY"}
// })


// find first by id

// prisma.user
//     .findFirst({
//         where: {id: 1},
//         include: {posts: true}
//     })
//     .then(data => console.log(data))
//     .catch(e => {
//         console.log(e)
//         process.exit(1)
//     })
//     .finally(() => prisma.$disconnect())

// read

// const read = async () => {
//     const data = await prisma.user.findMany()

//     console.log(data)
// }

// read()

// create

// prisma.user
//     .create({
//         data: {
//             name: "Bob",
//             bio: "profile bio",
//             posts: {
//                 create: [
//                     {
//                         content: "First Post"
//                     },
//                     {
//                         content: "Second Post"
//                     }
//                 ]
//             }
//         }
//     }).then(() => {
//         console.log("Inserted User Bob with Posts")
//     }).catch(e => {
//         console.error(e)
//         prisma.exit(1)
//     }).finally(() => {
//         prisma.$disconnect()
//     })