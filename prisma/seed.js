const prisma = require("./index");

const seed = async () => {
  await prisma.player.createMany({
    data: [
      {
        name: "Barky",
        breed: "Corgi",
        status: "field",
        imageUrl: "https://placedog.net/300/200?id=1",
      },
      {
        name: "Wuffles",
        breed: "Shiba Inu",
        status: "bench",
        imageUrl: "https://placedog.net/300/200?id=2",
      },
      // Add 8 more here...
    ],
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
