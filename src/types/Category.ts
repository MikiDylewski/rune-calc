import { Skill } from "./Skill";

export class Category {
  name: string;
  skill: Skill;
  description: string;

  constructor(name: string, skill: Skill, description: string) {
    this.name = name;
    this.skill = skill;
    this.description = description;
  }
}
