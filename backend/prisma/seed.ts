import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function resetDb()
{
  await prisma.share.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.expenseCategory.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  const tables = ['User', 'Group', 'Expense', 'ExpenseCategory', 'Share'];
  for (const table of tables)
  {
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1`);
  }
}

async function seed()
{
  await resetDb();

  const categoryNames = [
    'Food',
    'Transport',
    'Entertainment',
    'Groceries',
    'Rent',
    'Utilities',
    'Health',
    'Education',
    'Clothing',
    'Travel',
    'Gifts',
    'Subscriptions',
    'Pets',
    'Insurance',
    'Drinks',
    'Electronics',
    'Stationery',
    'Internet',
    'Maintenance',
    'Charity',
  ];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.expenseCategory.create({
        data: {
          name,
          icon: `https://example.com/icons/${name.toLowerCase()}.png`,
        },
      }),
    ),
  );

  const userPasswords: { username: string; email: string; password: string }[] = [];

  const users = await Promise.all(
    Array.from({ length: 20 }).map(async () =>
    {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const rawPassword = faker.internet.password();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      userPasswords.push({ username, email, password: rawPassword });

      return prisma.user.create({
        data: {
          username,
          email,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password: hashedPassword,
          avatar: faker.image.avatar(),
        },
      });
    }),
  );

  fs.writeFileSync('./seeded_passwords.txt', userPasswords.map((u) => `${u.username} (${u.email}): ${u.password}`).join('\n'), 'utf8');

  const groups = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.group.create({
        data: {
          name: faker.company.name(),
          members: {
            connect: faker.helpers
              .shuffle(users)
              .slice(0, faker.number.int({ min: 3, max: 6 }))
              .map((u) => ({ id: u.id })),
          },
        },
      }),
    ),
  );

  for (const group of groups)
  {
    const groupUsers = await prisma.group.findUnique({
      where: { id: group.id },
      include: { members: true },
    });

    const expenseCount = faker.number.int({ min: 4, max: 8 });

    for (let i = 0; i < expenseCount; i++)
    {
      const user = faker.helpers.arrayElement(groupUsers!.members);
      const category = faker.helpers.arrayElement(categories);

      const expense = await prisma.expense.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          amount: +(Math.random() * (300 - 10) + 10).toFixed(2),
          categoryId: category.id,
          date: faker.date.past(),
          userId: user.id,
          groupId: group.id,
        },
      });

      const participants = faker.helpers.shuffle(groupUsers!.members).slice(0, faker.number.int({ min: 2, max: 4 }));

      const shareAmount = +(expense.amount / participants.length).toFixed(2);

      for (const participant of participants)
      {
        await prisma.share.create({
          data: {
            userId: participant.id,
            expenseId: expense.id,
            amount: shareAmount,
          },
        });
      }
    }
  }
}

seed()
  .then(() =>
  {
    console.log('✅ Database seeded!');
    return prisma.$disconnect();
  })
  .catch((e) =>
  {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
