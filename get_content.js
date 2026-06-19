const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.page.findFirst({ where: { content: { not: null } }});
  if (page) console.log(page.content.substring(0, 500));
  else console.log("No content found");
}
main().catch(console.error).finally(() => prisma.$disconnect());
