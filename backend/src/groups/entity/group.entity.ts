export class Group {
  id: number;
  name: string;
  members: number[];
  expenses: number[];
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, members: number[], expenses: number[]) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.expenses = expenses;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
