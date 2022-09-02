import { Rules } from "./settings";

export class Users {
  oid: number;
  fullname: string;
  userID: string;
  password: string;
  re_password: string;
  rules: Rules;
}
