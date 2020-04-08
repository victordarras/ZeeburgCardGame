import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  const card = await prisma.card.create({
    data: {
      family: "SPADE",
      level: 11
    },
  })
  // console.log(card)

  const allCard = await prisma.card.findMany()
  console.dir(allCard, { depth: null })
}


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
