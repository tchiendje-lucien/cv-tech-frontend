import {
  Villes,
  States,
  Types,
  Speciality,
  Nationality,
  AcademicLevel,
} from "./settings";
import { Users } from "./users";

export class Candidates {
  oid: number;
  fullname: string;
  birthDate: Date;
  sexe: string;
  civility: string;
  adress: string;
  childrenNum: number;
  exprience_num: number;
  phone: number;
  villes: Villes;
  states: States;
  types: Types;
  speciality: Speciality;
  nationality: Nationality;
  users: Users;
  academicLevels: AcademicLevel;
}

export class Quartiers {
  oid: number;
  name: string;
}

export class TypesPJ {
  oid: number;
  name: string;
}

export class Attachements {
  oid: number;
  name: string;
  typesPJ:TypesPJ
}
