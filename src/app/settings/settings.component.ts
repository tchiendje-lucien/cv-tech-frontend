import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  Types,
  Speciality,
  Postes,
  Villes,
  AcademicLevel,
} from "../models/settings";
import { SettingService } from "../services/settingServices/setting.service";
import { Nationality, Rules } from '../models/settings';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  // Classe propriety
  types: Types;
  speciality: Speciality;
  postes: Postes;
  villes: Villes;
  academicLevel: AcademicLevel;
  nationality: Nationality;
  rules:Rules

  //List Propriety
  typesList: Types[];
  specialityList: Speciality[];
  postesList: Postes[];
  villesList: Villes[];
  academicLevelList: AcademicLevel[];
  nationalityList: Nationality[];
  rulesList:Rules[]

  //Other Proriety
  btn_state_type: boolean = true;
  btn_state_speciality: boolean = true;
  btn_state_postes: boolean = true;
  btn_state_villes: boolean = true;
  btn_state_academicLevel: boolean = true;
  btn_state_nationality: boolean = true;
  btn_state_rules:boolean=true
  reverse: boolean = false;
  key: string = "id";
  p_type: number = 1;
  p_speciality: number = 1;
  p_postes: number = 1;
  p_villes: number = 1;
  p_academicLevel: number = 1;
  p_nationality: number = 1;
  p_rules:number=1

  constructor(
    private formBuilder: FormBuilder,
    private settingServices: SettingService
  ) {}

  ngOnInit() {
    this.types = new Types();
    this.speciality = new Speciality();
    this.postes = new Postes();
    this.villes = new Villes();
    this.academicLevel = new AcademicLevel();
    this.nationality = new Nationality();
    this.rules = new Rules()
    this.list_types();
    this.list_speciality();
    this.list_postes();
    this.list_villes();
    this.list_academicLevel();
    this.list_nationality();
    this.list_rules()
  }

  type_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  speciality_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  postes_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  villes_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  academicLevel_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  nationality_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });

  rules_form = this.formBuilder.group({
    oid: new FormControl(-1, Validators.required),
    name: new FormControl("", Validators.required),
  });


  get types_name() {
    return this.type_form.get("name");
  }
  get speciality_name() {
    return this.speciality_form.get("name");
  }
  get postes_name() {
    return this.postes_form.get("name");
  }
  get villes_name() {
    return this.villes_form.get("name");
  }
  get academicLevel_name() {
    return this.academicLevel_form.get("name");
  }
  get nationality_name() {
    return this.nationality_form.get("name");
  }
  get rules_name() {
    return this.rules_form.get("name");
  }

  //Types Management
  types_change_input() {
    if (this.types.name == null || this.types.name == "") {
      this.btn_state_type = true;
    } else {
      this.btn_state_type = false;
    }
  }

  add_type() {
    if (this.type_form.valid) {
      if (this.type_form.get("oid").value == -1) {
        this.settingServices.post_types(this.types).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_types();
            this.cancel_type();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices.update_types(this.type_form.value).subscribe({
            next: (response) => {
              alert(response["message"]);
              this.list_types();
              this.cancel_type();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
        } else {
          this.cancel_type();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_types() {
    this.settingServices.list_types().subscribe({
      next: (response) => {
        this.typesList = response as Array<Types>;
        console.log(this.typesList);
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowTypes(index) {
    this.type_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_type() {
    this.type_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

  //speciality Management
  speciality_change_input() {
    if (this.speciality.name == null || this.speciality.name == "") {
      this.btn_state_speciality = true;
    } else {
      this.btn_state_speciality = false;
    }
  }

  add_speciality() {
    if (this.speciality_form.valid) {
      if (this.speciality_form.get("oid").value == -1) {
        this.settingServices.post_speciality(this.speciality).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_speciality();
            this.cancel_speciality();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices
            .update_speciality(this.speciality_form.value)
            .subscribe({
              next: (response) => {
                alert(response["message"]);
                this.list_speciality();
                this.cancel_speciality();
              },
              error: (e) => {
                console.log(e.error);
              },
            });
        } else {
          this.cancel_speciality();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_speciality() {
    this.settingServices.list_speciality().subscribe({
      next: (response) => {
        this.specialityList = response as Array<Speciality>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowSpeciality(index) {
    this.speciality_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_speciality() {
    this.speciality_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

  //Postes Management
  postes_change_input() {
    if (this.postes.name == null || this.postes.name == "") {
      this.btn_state_postes = true;
    } else {
      this.btn_state_postes = false;
    }
  }

  add_postes() {
    if (this.postes_form.valid) {
      if (this.postes_form.get("oid").value == -1) {
        this.settingServices.post_postes(this.postes).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_postes();
            this.cancel_postes();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices.update_postes(this.postes_form.value).subscribe({
            next: (response) => {
              alert(response["message"]);
              this.list_postes();
              this.cancel_postes();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
        } else {
          this.cancel_postes();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_postes() {
    this.settingServices.list_postes().subscribe({
      next: (response) => {
        this.postesList = response as Array<Postes>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowPostes(index) {
    this.postes_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_postes() {
    this.postes_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

  //Villes Management
  villes_change_input() {
    if (this.villes.name == null || this.villes.name == "") {
      this.btn_state_villes = true;
    } else {
      this.btn_state_villes = false;
    }
  }

  add_villes() {
    if (this.villes_form.valid) {
      if (this.villes_form.get("oid").value == -1) {
        this.settingServices.post_villes(this.villes).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_villes();
            this.cancel_villes();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices.update_villes(this.villes_form.value).subscribe({
            next: (response) => {
              alert(response["message"]);
              this.list_villes();
              this.cancel_villes();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
        } else {
          this.cancel_villes();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_villes() {
    this.settingServices.list_villes().subscribe({
      next: (response) => {
        this.villesList = response as Array<Villes>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowVilles(index) {
    this.villes_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_villes() {
    this.villes_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

  //Academic Level Management
  academicLevel_change_input() {
    if (this.academicLevel.name == null || this.academicLevel.name == "") {
      this.btn_state_academicLevel = true;
    } else {
      this.btn_state_academicLevel = false;
    }
  }

  add_academicLevel() {
    if (this.academicLevel_form.valid) {
      if (this.academicLevel_form.get("oid").value == -1) {
        this.settingServices.add_academyLevel(this.academicLevel).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_academicLevel();
            this.cancel_academicLevel();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices
            .update_academyLevel(this.academicLevel_form.value)
            .subscribe({
              next: (response) => {
                alert(response["message"]);
                this.list_academicLevel();
                this.cancel_academicLevel();
              },
              error: (e) => {
                console.log(e.error);
              },
            });
        } else {
          this.cancel_academicLevel();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_academicLevel() {
    this.settingServices.list_academyLevel().subscribe({
      next: (response) => {
        this.academicLevelList = response as Array<AcademicLevel>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowAcademicLevel(index) {
    this.academicLevel_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_academicLevel() {
    this.academicLevel_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

  //Nationality Management
  nationality_change_input() {
    if (this.nationality.name == null || this.nationality.name == "") {
      this.btn_state_nationality = true;
    } else {
      this.btn_state_nationality = false;
    }
  }

  add_nationality() {
    if (this.nationality_form.valid) {
      if (this.nationality_form.get("oid").value == -1) {
        this.settingServices.post_nationality(this.nationality).subscribe({
          next: (response) => {
            alert(response["message"]);
            this.list_nationality();
            this.cancel_nationality();
          },
          error: (e) => {
            console.log(e.error);
          },
        });
      } else {
        if (confirm("voullez vous vraiment effectuer cette modification?")) {
          this.settingServices
            .update_nationality(this.nationality_form.value)
            .subscribe({
              next: (response) => {
                alert(response["message"]);
                this.list_nationality();
                this.cancel_nationality();
              },
              error: (e) => {
                console.log(e.error);
              },
            });
        } else {
          this.cancel_nationality();
        }
      }
    } else {
      alert("Veillez remplir tous les champs");
    }
  }

  list_nationality() {
    this.settingServices.list_nationality().subscribe({
      next: (response) => {
        this.nationalityList = response as Array<Nationality>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowNationality(index) {
    this.nationality_form.patchValue({
      oid: index.oid,
      name: index.name,
    });
  }
  cancel_nationality() {
    this.nationality_form.patchValue({
      oid: -1,
      code: null,
      name: null,
    });
  }

    //Rules Management
    rules_change_input() {
      if (this.rules.name == null || this.rules.name == "") {
        this.btn_state_rules = true;
      } else {
        this.btn_state_rules = false;
      }
    }

    add_rules() {
      if (this.rules_form.valid) {
        if (this.rules_form.get("oid").value == -1) {
          this.settingServices.post_rules(this.rules).subscribe({
            next: (response) => {
              alert(response["message"]);
              this.list_rules();
              this.cancel_rules();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
        } else {
          if (confirm("voullez vous vraiment effectuer cette modification?")) {
            this.settingServices.update_rules(this.rules_form.value).subscribe({
              next: (response) => {
                alert(response["message"]);
                this.list_rules();
                this.cancel_rules();
              },
              error: (e) => {
                console.log(e.error);
              },
            });
          } else {
            this.cancel_rules();
          }
        }
      } else {
        alert("Veillez remplir tous les champs");
      }
    }

    list_rules() {
      this.settingServices.list_rules().subscribe({
        next: (response) => {
          this.rulesList = response as Array<Rules>;
        },
        error: (e) => {
          console.log(e.error);
        },
      });
    }

    ClickedRowRules(index) {
      this.rules_form.patchValue({
        oid: index.oid,
        name: index.name,
      });
    }
    cancel_rules() {
      this.rules_form.patchValue({
        oid: -1,
        code: null,
        name: null,
      });
    }

}
