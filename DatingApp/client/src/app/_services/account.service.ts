import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl="https://localhost:44396/api/";
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
 
  constructor(private http: HttpClient) {

   }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => 
      {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
      )
  }

  setCurrentUser(user : User)
  {
    debugger
    this.currentUserSource.next(user);
  }

  logout()
  {
      localStorage.removeItem('user');
      this.currentUserSource.next(undefined);
  }
}
