-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expenseId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE INDEX "Expense_groupId_idx" ON "Expense"("groupId");

-- CreateIndex
CREATE INDEX "Expense_userId_idx" ON "Expense"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Share_userId_expenseId_key" ON "Share"("userId", "expenseId");

-- CreateIndex
CREATE INDEX "_UserGroups_B_index" ON "_UserGroups"("B");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
