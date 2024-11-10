import { Category } from "./Category";

export class Item {
  id: number;
  name: string;
  category: Category;
  description: string;
  xp: number;
  amount: number;

  constructor(
    id: number,
    name: string,
    category: Category,
    description: string,
    xp: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.xp = xp;
    this.amount = 0;
  }
}
