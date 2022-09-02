import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { myConst } from "../../models/settings";
import { Users } from "../../models/users";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(users: Users) {
    return this.http.post(myConst.url.concat("login"), users);
  }

  update_user(users: Users) {
    return this.http.put(myConst.url.concat("update_user"), users);
  }

  create_user(users: Users) {
    return this.http.post(myConst.url.concat("add_user"), users);
  }

  update_password(users: Users) {
    return this.http.put(myConst.url.concat("change_pwd"), users);
  }

  list_user() {
    return this.http.get(myConst.url.concat("change_pwd"));
  }
}
