import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function main() {
  console.log("Seeding...")
}

main()
  .then(() => console.log("Done!"))
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect()
  })
