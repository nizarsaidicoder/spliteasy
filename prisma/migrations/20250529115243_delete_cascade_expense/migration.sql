-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_expenseId_fkey";

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
