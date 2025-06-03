export class Share
{
  id: number;
  userId: number;
  expenseId: number;
  amount: number;

  constructor(id: number, userId: number, expenseId: number, amount: number)
  {
    this.id = id;
    this.userId = userId;
    this.expenseId = expenseId;
    this.amount = amount;
  }
}
