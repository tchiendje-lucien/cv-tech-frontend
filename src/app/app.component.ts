import { Component } from "@angular/core";
import { Router } from "@angular/router";

// import "src/assets/pages/waves/css/waves.min.css";
// import "src/assets/css/bootstrap/css/bootstrap.min.css";
// import "src/assets/pages/waves/css/waves.min.css";
// import "src/assets/icon/themify-icons/themify-icons.css";
// import "src/assets/icon/font-awesome/css/font-awesome.min.css";
// //import "src/assets/css/jquery.mCustomScrollbar.css";
// import "src/assets/css/style.css";

// import "src/assets/js/jquery/jquery.min.js";
// import "src/assets/js/jquery-ui/jquery-ui.min.js";
// import "src/assets/js/popper.js/popper.min.js";
// import "src/assets/js/bootstrap/js/bootstrap.min.js";
// import "src/assets/pages/widget/excanvas.js";
// import "src/assets/pages/waves/js/waves.min.js";
// import "src/assets/js/jquery-slimscroll/jquery.slimscroll.js";
// //import "src/assets/js/modernizr/modernizr.js ";
// import "src/assets/js/SmoothScroll.js";
// //import "src/assets/js/jquery.mCustomScrollbar.concat.min.js";
// import "src/assets/js/pcoded.min.js";
// import "src/assets/js/vertical-layout.min.js";
// import "src/assets/pages/dashboard/custom-dashboard.js";
// import "src/assets/js/script.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "cv-tech";

  constructor(private route: Router) {}

  ngOnInit() {
    this.verify_login();
  }

  verify_login() {
    if (
      sessionStorage.getItem("user_info") == null ||
      sessionStorage.getItem("user_info") == ""
    ) {
      this.route.navigate(["login"]);
    }
  }
}
