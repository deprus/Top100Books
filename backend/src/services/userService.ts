import { prisma } from "..";

async function findByIdentifier(identifier: string) {
  const user =
    (await prisma.user.findUnique({ where: { email: identifier } })) ||
    (await prisma.user.findUnique({ where: { username: identifier } }));
  return user;
}

async function findById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

async function createUser(email: string, username: string, password: string) {
  await prisma.user.create({ data: { email, username, password } });
}

export { findByIdentifier, findById, createUser };
