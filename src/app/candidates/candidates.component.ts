import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { SettingService } from "../services/settingServices/setting.service";
import { SettingsComponent } from "../settings/settings.component";
import { Civility } from "../models/settings";
import * as _ from "lodash";
import { Candidates, Attachements } from "../models/candidates";
import { CdtSevicesService } from "../services/cdtServices/cdt-sevices.service";
import {
  Nationality,
  Types,
  Speciality,
  Postes,
  Villes,
  AcademicLevel,
  Rules,
} from "../models/settings";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-candidates",
  templateUrl: "./candidates.component.html",
  styleUrls: ["./candidates.component.css"],
  providers: [DatePipe],
})
export class CandidatesComponent implements OnInit {
  // Classe propriety
  types: Types;
  speciality: Speciality;
  postes: Postes;
  villes: Villes;
  academicLevel: AcademicLevel;
  nationality: Nationality;
  rules: Rules;
  civility: Civility;
  candidates: Candidates;

  //List Propriety
  typesList: Types[];
  specialityList: Speciality[];
  postesList: Postes[];
  villesList: Villes[];
  academicLevelList: AcademicLevel[];
  nationalityList: Nationality[];
  rulesList: Rules[];
  civilityList: Civility[];
  candidatesList: Candidates[];

  //Other Propriety
  cvFileSlected: File;
  cvFileSlectedUpdt: File;
  nationalitySelect: boolean = true;
  villesSelect: boolean = true;
  statesSelect: boolean = true;
  typesSelect: boolean = true;
  specialitySelect: boolean = true;
  academicLevelsSelect: boolean = true;
  civilitySelect: boolean = true;
  file_statut: boolean = true;
  fileUpdt_statut: boolean = true;
  cdtInfo: Candidates;
  ptsSelected;
  dateSelected: Date;
  p_cdt: number = 1;
  cdt_search: any;

  constructor(
    private formBuilder: FormBuilder,
    private settingServices: SettingService,
    private cdtServices: CdtSevicesService
  ) {}
  selectedValue: any;
  mySelect = [];

  ngOnInit() {
    this.types = new Types();
    this.speciality = new Speciality();
    this.postes = new Postes();
    this.villes = new Villes();
    this.academicLevel = new AcademicLevel();
    this.nationality = new Nationality();
    this.rules = new Rules();
    this.civility = new Civility();
    this.candidates = new Candidates();
    this.list_academicLevel();
    this.list_civility();
    this.list_nationality();
    this.list_postes();
    this.list_speciality();
    this.list_types();
    this.list_villes();
    this.list_candidate();
  }

  filterCdt_form = this.formBuilder.group({
    postes: new FormControl(),
    villes: new FormControl(),
    acdemicLevels: new FormControl(),
    expNumber: new FormControl(),
    speciality: new FormControl(),
  });

  candidate_form = this.formBuilder.group(
    {
      oid: new FormControl(-1, Validators.required),
      fullname: new FormControl("", Validators.required),
      email: new FormControl(),
      birthDate: new FormControl("", Validators.required),
      sexe: new FormControl(null, Validators.required),
      adress: new FormControl(),
      childrenNum: new FormControl("", Validators.required),
      exprience_num: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      quartier: new FormControl(),
      villes: new FormControl(null, Validators.required),
      //states: new FormControl("", Validators.required),
      types: new FormControl(null, Validators.required),
      speciality: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      academicLevels: new FormControl(null, Validators.required),
      postes: new FormControl([], Validators.required),
      civility: new FormControl(null, Validators.required),
      cv_file: new FormControl("", [Validators.required]),
    },
    { updateOn: "submit" }
  );

  get fullname_cdt() {
    return this.candidate_form.get("fullname");
  }

  get phone_cdt() {
    return this.candidate_form.get("phone");
  }

  get email_cdt() {
    return this.candidate_form.get("email");
  }

  get sexe_cdt() {
    return this.candidate_form.get("sexe");
  }

  get nationality_cdt() {
    return this.candidate_form.get("nationality");
  }

  get civility_cdt() {
    return this.candidate_form.get("civility");
  }

  get childrenNum_cdt() {
    return this.candidate_form.get("childrenNum");
  }

  get villes_cdt() {
    return this.candidate_form.get("villes");
  }

  get quartier_cdt() {
    return this.candidate_form.get("quartier");
  }

  get adress_cdt() {
    return this.candidate_form.get("adress");
  }

  get birthDate_cdt() {
    return this.candidate_form.get("birthDate");
  }

  get speciality_cdt() {
    return this.candidate_form.get("speciality");
  }

  get academicLevels_cdt() {
    return this.candidate_form.get("academicLevels");
  }

  get types_cdt() {
    return this.candidate_form.get("types");
  }

  get postes_cdt() {
    return this.candidate_form.get("postes");
  }

  get exprience_num_cdt() {
    return this.candidate_form.get("exprience_num");
  }

  get cv_file_cdt() {
    return this.candidate_form.get("cv_file");
  }

  updateCdt_form = this.formBuilder.group(
    {
      oid: new FormControl(-1, Validators.required),
      fullname: new FormControl("", Validators.required),
      email: new FormControl(),
      birthDate: new FormControl("", Validators.required),
      sexe: new FormControl("", Validators.required),
      adress: new FormControl(),
      childrenNum: new FormControl("", Validators.required),
      exprience_num: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      quartier: new FormControl(),
      villes: new FormControl("-1", Validators.required),
      //states: new FormControl("", Validators.required),
      types: new FormControl("-1", Validators.required),
      speciality: new FormControl("-1", Validators.required),
      nationality: new FormControl("", Validators.required),
      academicLevels: new FormControl("-1", Validators.required),
      postes: new FormControl([], Validators.required),
      civility: new FormControl("-1", Validators.required),
      cv_file: new FormControl(),
    },
    { updateOn: "submit" }
  );
  get fullname_cdtUpdt() {
    return this.updateCdt_form.get("fullname");
  }

  get phone_cdtUpdt() {
    return this.updateCdt_form.get("phone");
  }

  get email_cdtUpdt() {
    return this.updateCdt_form.get("email");
  }

  get sexe_cdtUpdt() {
    return this.updateCdt_form.get("sexe");
  }

  get nationality_cdtUpdt() {
    return this.updateCdt_form.get("nationality");
  }

  get civility_cdtUpdt() {
    return this.updateCdt_form.get("civility");
  }

  get childrenNum_cdtUpdt() {
    return this.updateCdt_form.get("childrenNum");
  }

  get villes_cdtUdt() {
    return this.updateCdt_form.get("villes");
  }

  get quartier_cdtUpdt() {
    return this.updateCdt_form.get("quartier");
  }

  get adress_cdtUpdt() {
    return this.updateCdt_form.get("adress");
  }

  get birthDate_cdtUpdt() {
    return this.updateCdt_form.get("birthDate");
  }

  get speciality_cdtUpdt() {
    return this.updateCdt_form.get("speciality");
  }

  get academicLevels_cdtUpdt() {
    return this.updateCdt_form.get("academicLevels");
  }

  get types_cdtUpdt() {
    return this.updateCdt_form.get("types");
  }

  get postes_cdtUpdt() {
    return this.updateCdt_form.get("postes");
  }

  get exprience_num_cdtUpdt() {
    return this.updateCdt_form.get("exprience_num");
  }

  changeSelect(event) {
    if (event.target.value == -1) {
      this.nationalitySelect = false;
    } else {
      this.nationalitySelect = true;
    }
  }

  getDropDownText(id, object) {
    const selObj = _.filter(object, function (o) {
      return _.includes(id, o.id);
    });
    return selObj;
  }
  selectChange() {
    this.selectedValue = this.getDropDownText(this.mySelect, this.postesList);
  }

  getToday(): string {
    return new Date().toISOString().split("T")[0];
  }

  candidate_change_input() {
    if (
      this.candidate_form.get("fullname").value == "" ||
      this.candidate_form.get("fullname").value == null
    ) {
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  onFileChangedCV(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file);
      if (file.type == "application/pdf") {
        this.cvFileSlected = event.target.files[0];
        console.log("correct");
        this.file_statut = true;
      } else {
        this.file_statut = false;
        //call validation
        this.candidate_form.get("cv_file").reset();
        this.candidate_form.controls["cv_file"].setValidators([
          Validators.required,
        ]);
        this.candidate_form.get("cv_file").updateValueAndValidity();
      }
    }
  }

  onFileChangedCVUpdt(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file);
      if (file.type == "application/pdf") {
        this.cvFileSlectedUpdt = event.target.files[0];
        console.log("correct");
        this.fileUpdt_statut = true;
      } else {
        this.fileUpdt_statut = false;
        //call validation
        this.updateCdt_form.get("cv_file").reset();
        this.updateCdt_form.controls["cv_file"].setValidators([
          Validators.required,
        ]);
        this.updateCdt_form.get("cv_file").updateValueAndValidity();
      }
    }
  }

  list_nationality() {
    this.settingServices.list_nationality().subscribe({
      next: (response) => {
        this.nationalityList = response as Array<Nationality>;
      },
      error: (e) => {
        console.log(e.errror);
      },
    });
  }

  list_civility() {
    this.settingServices.list_civility().subscribe({
      next: (response) => {
        this.civilityList = response as Array<Civility>;
        console.log(this.civilityList);
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  list_types() {
    this.settingServices.list_types().subscribe({
      next: (response) => {
        this.typesList = response as Array<Types>;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
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

  // upload_cv() {
  //   var cvFormData = new FormData();
  //   cvFormData.append("cv_file", this.cvFileSlected, this.cvFileSlected.name);
  //   this.cdtServices.upload_cv(cvFormData).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //     },
  //     error: (e) => {
  //       console.log(e.error);
  //     },
  //   });
  // }

  cancel_candidate_updt() {
    //console.log(index)
    let pts = [];
    this.cvFileSlected = null;
    this.cvFileSlectedUpdt = null;
    this.dateSelected = null;
    this.ptsSelected = pts;
    this.updateCdt_form.patchValue({
      academicLevels: null,
      adress: null,
      birthDate: null,
      postes: null,
      childrenNum: null,
      civility: null,
      codeCdt: null,
      email: null,
      exprience_num: null,
      fullname: null,
      nationality: null,
      phone: null,
      quartier: null,
      sexe: null,
      speciality: null,
      states: null,
      types: null,
      villes: null,
      cv_file: null,
    });
  }

  cancel_candidate_new() {
    //console.log(index)
    let pts = [];
    this.cvFileSlected = null;
    this.cvFileSlectedUpdt = null;
    this.dateSelected = null;
    this.ptsSelected = pts;
    this.candidate_form.patchValue({
      oid: -1,
      academicLevels: null,
      adress: null,
      birthDate: null,
      postes: null,
      childrenNum: null,
      civility: null,
      codeCdt: null,
      email: null,
      exprience_num: null,
      fullname: null,
      nationality: null,
      phone: null,
      quartier: null,
      sexe: null,
      speciality: null,
      states: null,
      types: null,
      villes: null,
      cv_file: null,
    });
  }

  save_candate() {
    if (this.candidate_form.valid) {
      // console.log(JSON.parse(sessionStorage.getItem("user_info")));
      // console.log(this.candidates.nationality);
      var cvFormData = new FormData();
      var candidateFormData = new FormData();
      var selectedPoste = [];
      let candidateObj = {
        oid: this.candidate_form.get("oid").value,
        fullname: this.candidate_form.get("fullname").value,
        email: this.candidate_form.get("email").value,
        birthDate: this.candidate_form.get("birthDate").value,
        sexe: this.candidate_form.get("sexe").value,
        adress: this.candidate_form.get("adress").value,
        childrenNum: this.candidate_form.get("childrenNum").value,
        exprience_num: this.candidate_form.get("exprience_num").value,
        phone: this.candidate_form.get("phone").value,
        quartier: this.candidate_form.get("quartier").value,
        villes: this.candidate_form.get("villes").value,
        states: { oid: 1 },
        types: this.candidate_form.get("types").value,
        speciality: this.candidate_form.get("speciality").value,
        nationality: this.candidate_form.get("nationality").value,
        users: JSON.parse(sessionStorage.getItem("user_info")),
        academicLevels: this.candidate_form.get("academicLevels").value,
        civility: this.candidate_form.get("civility").value,
      };

      let p: number[] = this.candidate_form.get("postes").value;
      for (var option of this.candidate_form.get("postes").value) {
        selectedPoste.push({ oid: option });
      }

      cvFormData.append("cv_file", this.cvFileSlected, this.cvFileSlected.name);
      candidateFormData.append("candidates", JSON.stringify(candidateObj));
      candidateFormData.append(
        "postes",
        JSON.stringify(this.candidate_form.get("postes").value)
      );
      candidateFormData.append(
        "attachements",
        JSON.stringify({
          cv_file: this.cvFileSlected.name,
        })
      );
      candidateFormData.append(
        "cv_file",
        this.cvFileSlected,
        this.cvFileSlected.name
      );
      //const
      this.cdtServices.add_candidate(candidateFormData).subscribe({
        next: (response) => {
          //this.upload_cv();
          //console.log(response);
          alert(response["message"]);
          this.list_candidate();
          this.cancel_candidate_new();
        },
        error: (e) => {
          console.log(e.error);
        },
      });
    } else {
      alert(
        "Veillez remplir tous les champs obligatoire avec les bonnes valeurs"
      );
    }
  }

  list_candidate() {
    this.cdtServices.list_candidate().subscribe({
      next: (response) => {
        this.candidatesList = response as Array<Candidates>;
        console.log(this.candidatesList);
        this.filterCdt_form.patchValue({
          postes: null,
          villes: null,
          academicLevels: null,
          exprience_num: null,
          speciality: null,
        });
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  ClickedRowCdt(index) {
    console.log(index);
    let pts = [];
    for (var option of index.cdtPostes) {
      pts.push(option.postes);
    }
    this.dateSelected = index.birthDate;
    this.ptsSelected = pts;
    this.candidates.cdtPostes = index.cdtPostes[0].postes;
    this.updateCdt_form.patchValue({
      oid: index.oid,
      academicLevels: index.academicLevels,
      adress: index.adress,
      birthDate: index.birthDate,
      postes: this.ptsSelected,
      childrenNum: index.childrenNum,
      civility: index.civility,
      codeCdt: index.codeCdt,
      email: index.email,
      exprience_num: index.exprience_num,
      fullname: index.fullname,
      nationality: index.nationality,
      phone: index.phone,
      quartier: index.quartier,
      sexe: index.sexe,
      speciality: index.speciality,
      states: index.states,
      types: index.types,
      villes: index.villes,
    });
  }

  update_candate() {
    console.log(this.updateCdt_form.get("postes").value);
    console.log(this.updateCdt_form.get("birthDate").value);
    if (this.updateCdt_form.valid) {
      if (this.cvFileSlectedUpdt == null || this.cvFileSlectedUpdt.name == "") {
        // console.log(JSON.parse(sessionStorage.getItem("user_info")));
        // console.log(this.candidates.nationality);
        var cvFormData = new FormData();
        var candidateFormData = new FormData();
        var selectedPoste = [];
        let candidateObj = {
          oid: this.updateCdt_form.get("oid").value,
          fullname: this.updateCdt_form.get("fullname").value,
          email: this.updateCdt_form.get("email").value,
          birthDate: this.updateCdt_form.get("birthDate").value,
          sexe: this.updateCdt_form.get("sexe").value,
          adress: this.updateCdt_form.get("adress").value,
          childrenNum: this.updateCdt_form.get("childrenNum").value,
          exprience_num: this.updateCdt_form.get("exprience_num").value,
          phone: this.updateCdt_form.get("phone").value,
          quartier: this.updateCdt_form.get("quartier").value,
          villes: this.updateCdt_form.get("villes").value,
          states: { oid: 1 },
          types: this.updateCdt_form.get("types").value,
          speciality: this.updateCdt_form.get("speciality").value,
          nationality: this.updateCdt_form.get("nationality").value,
          users: JSON.parse(sessionStorage.getItem("user_info")),
          academicLevels: this.updateCdt_form.get("academicLevels").value,
          civility: this.updateCdt_form.get("civility").value,
        };
        console.log(candidateObj);

        let p: number[] = this.updateCdt_form.get("postes").value;
        for (var option of this.updateCdt_form.get("postes").value) {
          selectedPoste.push({ oid: option });
        }
        candidateFormData.append("candidates", JSON.stringify(candidateObj));
        candidateFormData.append(
          "postes",
          JSON.stringify(this.updateCdt_form.get("postes").value)
        );
        //const
        this.cdtServices
          .update_candidate_withoutFile(candidateFormData)
          .subscribe({
            next: (response) => {
              //this.upload_cv();
              //console.log(response);
              alert(response["message"]);
              this.list_candidate();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
      } else {
        // console.log(JSON.parse(sessionStorage.getItem("user_info")));
        // console.log(this.candidates.nationality);
        var cvFormData = new FormData();
        var candidateFormData = new FormData();
        var selectedPoste = [];
        let candidateObj = {
          oid: this.updateCdt_form.get("oid").value,
          fullname: this.updateCdt_form.get("fullname").value,
          email: this.updateCdt_form.get("email").value,
          birthDate: this.updateCdt_form.get("birthDate").value,
          sexe: this.updateCdt_form.get("sexe").value,
          adress: this.updateCdt_form.get("adress").value,
          childrenNum: this.updateCdt_form.get("childrenNum").value,
          exprience_num: this.updateCdt_form.get("exprience_num").value,
          phone: this.updateCdt_form.get("phone").value,
          quartier: this.updateCdt_form.get("quartier").value,
          villes: this.updateCdt_form.get("villes").value,
          states: { oid: 1 },
          types: this.updateCdt_form.get("types").value,
          speciality: this.updateCdt_form.get("speciality").value,
          nationality: this.updateCdt_form.get("nationality").value,
          users: JSON.parse(sessionStorage.getItem("user_info")),
          academicLevels: this.updateCdt_form.get("academicLevels").value,
          civility: this.updateCdt_form.get("civility").value,
        };
        let p: number[] = this.updateCdt_form.get("postes").value;
        for (var option of this.updateCdt_form.get("postes").value) {
          selectedPoste.push({ oid: option });
        }

        candidateFormData.append("candidates", JSON.stringify(candidateObj));
        candidateFormData.append(
          "postes",
          JSON.stringify(this.updateCdt_form.get("postes").value)
        );
        candidateFormData.append(
          "attachements",
          JSON.stringify({
            cv_file: this.cvFileSlectedUpdt.name,
          })
        );
        candidateFormData.append(
          "cv_file",
          this.cvFileSlectedUpdt,
          this.cvFileSlectedUpdt.name
        );
        //const
        this.cdtServices
          .update_candidate_withFile(candidateFormData)
          .subscribe({
            next: (response) => {
              //this.upload_cv();
              //console.log(response);
              alert(response["message"]);
              this.list_candidate();
            },
            error: (e) => {
              console.log(e.error);
            },
          });
      }
    } else {
      alert(
        "Veillez remplir tous les champs obligatoire avec les bonnes valeurs"
      );
    }
  }

  downloadCV(index) {
    console.log(index.attachements.cv_file);
    this.cdtServices.downloadCV(index.attachements.cv_file).subscribe((res) => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, "_blank");
    });
  }

  Search_cdt() {
    if (this.cdt_search == "") {
      this.list_candidate();
    } else {
      this.candidatesList = this.candidatesList.filter((res) => {
        console.log(res.codeCdt);
        return (
          res.fullname
            .toLocaleLowerCase()
            .match(this.cdt_search.toLocaleLowerCase()) ||
          res.codeCdt
            .toLocaleLowerCase()
            .match(this.cdt_search.toLocaleLowerCase())
        );
      });
    }
  }

  filter_candidate() {
    let data = {
      postes: this.filterCdt_form.get("postes").value,
      villes: this.filterCdt_form.get("villes").value,
      academicLevels: this.filterCdt_form.get("acdemicLevels").value,
      exprience_num: this.filterCdt_form.get("expNumber").value,
      speciality: this.filterCdt_form.get("speciality").value,
    };
    console.log(data);
    this.cdtServices.filter_candidate(data).subscribe({
      next: (response) => {
        let tmp = [];
        for (var option of response as Array<any>) {
          console.log(option.candidates.attachements[0].cv_file);
          tmp.push({
            oid: option.candidates.oid,
            fullname: option.candidates.fullname,
            codeCdt: option.candidates.codeCdt,
            birthDate: option.candidates.birthDate,
            email: option.candidates.email,
            sexe: option.candidates.sexe,
            adress: option.candidates.adress,
            childrenNum: option.candidates.childrenNum,
            exprience_num: option.candidates.exprience_num,
            phone: option.candidates.phone,
            quartier: option.candidates.quartier,
            villes: option.candidates.villes,
            states: option.candidates.states,
            types: option.candidates.types,
            speciality: option.candidates.speciality,
            nationality: option.candidates.nationality,
            users: option.candidates.users,
            academicLevels: option.candidates.academicLevels,
            civility: option.candidates.civility,
            attachements: {
              cv_file: option.candidates.attachements[0].cv_file,
            },
            cdtPostes: [{ oid: option.oid, postes: option.postes }],
          });
        }
        this.candidatesList = tmp;
        // console.log(response);
        // console.log(tmp);
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }
}
