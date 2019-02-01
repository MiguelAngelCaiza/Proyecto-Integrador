import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiService {
  public url: string = "http://apiinstituto/api/v1/";

  constructor(private http: HttpClient) {}

  post(endpoint: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(this.url + "" + endpoint, body, httpOptions);
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.get(this.url + "" + endpoint, reqOpts);
  }
}
