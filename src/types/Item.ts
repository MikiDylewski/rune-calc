import { Category } from "./Category";

export class Item {
  id: number;
  name: string;
  isMember: boolean;
  experience: StringNumberObject;
  skills: StringNumberObject;
  amount: number;

  constructor(
    id: number,
    name: string,
    isMember: boolean,
    experience: StringNumberObject,
    skills: StringNumberObject
  ) {
    this.id = id;
    this.name = name;
    this.isMember = isMember;
    this.experience = experience;
    this.skills = skills;
    this.amount = 0;
  }
}
type StringNumberObject = {
  [key: string]: number;
};
