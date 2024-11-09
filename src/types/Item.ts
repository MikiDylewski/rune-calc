import { Category } from "./Category";

export class Item {
  name: string;
  category: Category;
  description: string;
  xp: number;
  amount: number;

  constructor(
    name: string,
    category: Category,
    description: string,
    xp: number,
    amount: number
  ) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.xp = xp;
    this.amount = amount;
  }
}
