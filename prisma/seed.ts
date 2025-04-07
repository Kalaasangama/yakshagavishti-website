import { PlayCharacters, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const colleges = [
  { name: "SDM Law College, Mangalore", teamName: "Team 1" },
  { name: "St. Aloysius College, Mangalore", teamName: "Team 2" },
  { name: "SDPT First Grade College, Kateelu", teamName: "Team 3" },
  { name: "Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal", teamName: "Team 4" },
  { name: "Govinda Dasa Degree College, Suratkal", teamName: "Team 5" }
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
            number: index + 1,
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
