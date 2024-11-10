import { Skill } from "./Skill";

export class Category {
  id: number;
  name: string;
  skill: Skill;
  description: string;

  constructor(id: number, name: string, skill: Skill, description: string) {
    this.id = id;
    this.name = name;
    this.skill = skill;
    this.description = description;
  }
}
