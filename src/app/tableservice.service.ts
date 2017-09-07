import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class groupService {

  constructor(
    private http: Http
  ) { }
    getAll() {

            let headers = new Headers({'Content-Type ': 'application/json'})
            let options = new RequestOptions({ headers: headers });
            
            return this.http.post('/data.json', options).map((response: Response) => {
                return response.json();
            });
        }
}
