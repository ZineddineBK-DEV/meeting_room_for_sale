import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, catchError, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly baseUrl = environment.apiUrl;
  private api = `${this.baseUrl}user/`;
  imagesURL=environment.PICS_URL

  private userID! :string
  private user!: User;
  drivers!:User[]
  applicants!:User[]

  constructor(private http:HttpClient, private router:Router) { }


  getEmployees(): Observable<any>{
    return this.http.get(this.api + "getall").pipe(
      catchError(throwError)
    );
  }
  getUserById(userID:string){
    return this.http.get(this.api + "getUserByID/" + userID).pipe(
      catchError(throwError)
    );
  }
  getUserByEmail(userEmail:string){
    return this.http.post(this.api + "getUserByEmail/" , {email:userEmail}).pipe(
      catchError(throwError)
    );
  }
  updateUser(userID:string,userForm: any){
    return this.http.put(this.api + "update/" + userID,userForm).pipe(
      catchError(throwError)
    );
  }
  updatePass(userID:string,userForm: any){
    return this.http.patch(this.api + "updatePass/" + userID,userForm).pipe(
      catchError(throwError)
    );
  }




  


  
}
