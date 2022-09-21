import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { myConst } from "../../models/settings";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CdtSevicesService {
  constructor(private http: HttpClient) {}

  add_candidate(candidates: any) {
    return this.http.post(myConst.url.concat("add_candidate"), candidates);
  }

  list_candidate() {
    return this.http.get(myConst.url.concat("list_candidate"));
  }

  upload_cv(cv_file) {
    return this.http.post(myConst.url.concat("uploadCvFile"), cv_file);
  }

  update_candidate_withFile(candidates: any) {
    return this.http.put(
      myConst.url.concat("update_candidate_withFile"),
      candidates
    );
  }

  update_candidate_withoutFile(candidates: any) {
    return this.http.put(
      myConst.url.concat("update_candidate_withoutFile"),
      candidates
    );
  }

  // downloadCV(fileneme: any) {
  //   return this.http.post(myConst.url.concat("downloadCV"), fileneme);
  // }

  // downloadFile(filename: string): Observable<any> {
  //   return this.http
  //     .post(myConst.url.concat("downloadCV"), filename, {
  //       responseType: "blob",
  //     })
  //     .pipe(
  //       map((response) => {
  //         return {
  //           filename: "yourFileName.pdf",
  //           data: new Blob(response.blob()),
  //         };
  //       })
  //     );
  // }

  downloadCV(filename: string): any {
    return this.http
      .post(myConst.url.concat("downloadCV"), filename, {
        responseType: "blob",
        observe: "response",
      })
      .pipe(
        map((res: any) => {
          return new Blob([res.body], { type: "application/pdf" });
        })
      );
  }

  filter_candidate(data: any) {
    return this.http.post(myConst.url.concat("filterCandidate"), data);
  }
}
