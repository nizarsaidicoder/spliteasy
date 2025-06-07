-- CreateTable
CREATE TABLE "ExpenseComment" (
    "id" SERIAL NOT NULL,
    "expenseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExpenseComment_expenseId_idx" ON "ExpenseComment"("expenseId");

-- AddForeignKey
ALTER TABLE "ExpenseComment" ADD CONSTRAINT "ExpenseComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseComment" ADD CONSTRAINT "ExpenseComment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
