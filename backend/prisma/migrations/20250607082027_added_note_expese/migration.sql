/*
  Warnings:

  - You are about to drop the `ExpenseComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseComment" DROP CONSTRAINT "ExpenseComment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseComment" DROP CONSTRAINT "ExpenseComment_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "note" TEXT;

-- DropTable
DROP TABLE "ExpenseComment";
