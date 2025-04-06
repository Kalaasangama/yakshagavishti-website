import { PlayCharacters, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const colleges = [
//   {
//     "name": "SDM Law College, Mangalore",
//     "details": null,
//     "password": "hello",
//     "Team": {
//       "name": "ಅವನಿ",
//       "number": 1
//     }
//   },
//   {
//     "name": "St. Aloysius College, Mangalore",
//     "details": null,
//     "password": "hello",
//     "Team": {
//       "name": "ಅವನಿ",
//       "number": 1
//     }
//   },
//   {
//     "name": "SDPT First Grade College, Kateelu",
//     "details": null,
//     "password": "hello",
//     "Team": {
//       "name": "ಅವನಿ",
//       "number": 1
//     }
//   },
//   {
//     "name": "Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal",
//     "details": null,
//     "password": "hello",
//     "Team": {
//       "name": "ಅವನಿ",
//       "number": 1
//     }
//   },
//   {
//     "name": "Govinda Dasa Degree College, Suratkal",
//     "details": null,
//     "password": "hello",
//     "Team": {
//       "name": "ಅವನಿ",
//       "number": 1
//     }
//   }
// ]

const colleges = [
  { name: "SDM Law College, Mangalore", teamName: "ಅವನಿ" },
  { name: "St. Aloysius College, Mangalore", teamName: "ಅನಿಲ" },
  { name: "SDPT First Grade College, Kateelu", teamName: "ಅಗ್ನಿ" },
  { name: "Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal", teamName: "ಅಂಬರ" },
  { name: "Govinda Dasa Degree College, Suratkal", teamName: "ಅರ್ನಹ" }
]

async function main() {
  for (const [index, college] of colleges.entries()) {
    const { name, teamName } = college;

    await prisma.college.create({
      data: {
        name,
        password: "hello",
        Team: {
          create: {
            name: teamName,
            number: index+1,
          },
        },
      },
    });
  }

  for (const character of Object.values(PlayCharacters)) {
    await prisma.character.create({
      data: {
        character: character,
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Data seeded successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    console.error("Error seeding data");
    process.exit(1);
  });
