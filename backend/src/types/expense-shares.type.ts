import { Expense, Share } from '@prisma/client';

export type ExpenseShares = Expense & {
  shares: Share[];
};
