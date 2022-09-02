import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DecorationComponent } from './decoration/decoration.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  // {
  //   path: "",
  //   component: DashboardComponent,
  //   children: [
  //     {
  //       path: "setting",
  //       component: SettingsComponent,
  //       outlet: "settingOutlet",
  //     },
  //   ],
  // },
  {
    path: "setting",
    component: DecorationComponent
  },
  {
    path: "candidate",
    component: DecorationComponent
  },
  {
    path: "",
    component: DecorationComponent
  },
  {
    path: "users",
    component: DecorationComponent
  },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//export const appRoutingModule = RouterModule.forRoot(routes);
//export const RoutingComponent = [SettingsComponent,LoginComponent];
