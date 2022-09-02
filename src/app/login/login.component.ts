import { Rules } from "./../models/settings";
import { Component, OnInit } from "@angular/core";
import { Users } from "../models/users";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { UsersService } from "../services/uersServices/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  users: Users;
  rules: Rules;
  btn_state: boolean = true;
  login_error: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private route:Router
  ) {}

  ngOnInit() {
    this.users = new Users();
    this.rules = new Rules();
  }

  login_form = this.formBuilder.group({
    userID: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  get userID() {
    return this.login_form.get("userID");
  }
  get password() {
    return this.login_form.get("password");
  }

  login_change_input() {
    if (
      this.users.userID == null ||
      this.users.userID == null ||
      this.users.password == "" ||
      this.users.password == ""
    ) {
      this.btn_state = true;
    } else {
      this.btn_state = false;
    }
  }

  login_user() {
    if (this.login_form.valid) {
      this.usersService.login(this.users).subscribe({
        next: (response) => {
          if (response == null) {
            this.login_error = false;
          } else {
            this.login_error = true;
            sessionStorage.setItem("user_info", JSON.stringify(response));
            console.log(JSON.parse(sessionStorage.getItem("user_info")));
            this.route.navigate(["setting"])
          }
        },
        error: (e) => {
          console.log(e.error);
        },
      });
    } else {
      alert("Veillez remplir tous les champs");
    }
  }
}
