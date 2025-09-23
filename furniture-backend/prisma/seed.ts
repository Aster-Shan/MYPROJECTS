import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export function createRandomUser() {
  return {
    phone: faker.phone.number({ style: 'international' }),
    password: '',
    randToken: faker.internet.jwt(),
  };
}

export const UserData = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

async function main() {
  console.log('Start seeding ...');
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('12345567', salt);

  for (const u of UserData) {
    u.password = password;
    await prisma.user.create({ data: u });
  }
  console.log('seeding finished');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
