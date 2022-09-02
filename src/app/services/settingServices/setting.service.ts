import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Types } from "src/app/models/settings";
import {
  myConst,
  AcademicLevel,
  Nationality,
  Postes,
  Speciality,
  Villes,
  Rules,
} from "../../models/settings";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  constructor(private http: HttpClient) {}

  add_academyLevel(academyLevel: AcademicLevel) {
    return this.http.post(myConst.url.concat("add_academyLevel"), academyLevel);
  }

  update_academyLevel(academyLevel: AcademicLevel) {
    return this.http.put(
      myConst.url.concat("update_academyLevel"),
      academyLevel
    );
  }

  list_academyLevel() {
    return this.http.get(myConst.url.concat("list_academyLevel"));
  }

  post_nationality(nationality: Nationality) {
    return this.http.post(myConst.url.concat("add_nationality"), nationality);
  }

  update_nationality(nationality: Nationality) {
    return this.http.put(myConst.url.concat("update_nationality"), nationality);
  }

  list_nationality() {
    return this.http.get(myConst.url.concat("list_nationality"));
  }

  post_postes(postes: Postes) {
    return this.http.post(myConst.url.concat("add_poste"), postes);
  }

  update_postes(postes: Postes) {
    return this.http.put(myConst.url.concat("update_poste"), postes);
  }

  list_postes() {
    return this.http.get(myConst.url.concat("list_poste"));
  }

  post_speciality(speciality: Speciality) {
    return this.http.post(myConst.url.concat("add_speciality"), speciality);
  }

  update_speciality(speciality: Speciality) {
    return this.http.put(myConst.url.concat("update_speciality"), speciality);
  }

  list_speciality() {
    return this.http.get(myConst.url.concat("list_speciality"));
  }

  post_types(types: Types) {
    return this.http.post(myConst.url.concat("add_type"), types);
  }

  update_types(types: Types) {
    return this.http.put(myConst.url.concat("update_type"), types);
  }

  list_types() {
    return this.http.get(myConst.url.concat("list_type"));
  }

  post_villes(villes: Villes) {
    return this.http.post(myConst.url.concat("add_ville"), villes);
  }

  update_villes(villes: Villes) {
    return this.http.put(myConst.url.concat("update_ville"), villes);
  }

  list_villes() {
    return this.http.get(myConst.url.concat("list_ville"));
  }

  post_rules(rules: Rules) {
    return this.http.post(myConst.url.concat("add_rule"), rules);
  }

  update_rules(rules: Rules) {
    return this.http.put(myConst.url.concat("update_rule"), rules);
  }

  list_rules() {
    return this.http.get(myConst.url.concat("list_rule"));
  }
}
