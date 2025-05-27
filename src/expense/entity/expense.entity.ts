import { Share } from './share.entity';

export class Expense
{
  id: number;
  name: string;
  description?: string;
  amount: number;
  date: Date;
  groupId: number;
  userId: number;
  shares: Share[];

  constructor(
    id: number,
    name: string,
    description: string,
    amount: number,
    date: Date,
    groupId: number,
    userId: number,
    shares: Share[],
  )
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.groupId = groupId;
    this.userId = userId;
    this.shares = shares;
  }
}
