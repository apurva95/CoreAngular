import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl="https://localhost:44396/api/";
 
  constructor(private http: HttpClient) {

   }

  login(model: any): Observable<any>
  {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => 
      {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      )
  }

  logout()
  {
      localStorage.removeItem('user');

  }
}
