import {
  Villes,
  States,
  Types,
  Speciality,
  Nationality,
  AcademicLevel,
} from "./settings";
import { Users } from "./users";
import { Civility, Postes } from './settings';

export class Candidates {
  oid: number;
  fullname: string;
  codeCdt:string;
  birthDate: Date;
  email: string;
  sexe: string;
  adress: string;
  childrenNum: number;
  exprience_num: number;
  phone: number;
  quartier: string;
  villes: Villes;
  states: States;
  types: Types;
  speciality: Speciality;
  nationality: Nationality;
  users: Users;
  academicLevels: AcademicLevel;
  civility: Civility;
  cdtPostes:Array<CdtPostes>
}

export class CdtPostes {
  oid: number;
  postes: Postes;
}

export class Quartiers {
  oid: number;
  name: string;
}

export class Attachements {
  oid: number;
  cv_file: string;
}
