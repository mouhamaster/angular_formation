import { Injectable } from '@angular/core';
import {AppUser} from "../model/users.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
users:AppUser[]=[];
authUser:AppUser | undefined;
  constructor() {
    this.users.push({userId:UUID.UUID(),username:"Lamine",password:"1234",roles:["user"]});
    this.users.push({userId:UUID.UUID(),username:"Modou",password:"1234",roles:["user"]});
    this.users.push({userId:UUID.UUID(),username:"Master",password:"1234",roles:["user","admin"]});
  }
  // auth method
  public login(username:String,password:string):Observable<AppUser>{
    let checkuser=this.users.find(u=>u.username==username);
    if(!checkuser) return  throwError(()=>new Error("user not fount"))
    if(checkuser.password!=password){
      return  throwError(()=>new Error("Bad credentials"));
    }
    return of(checkuser);
  }
  public authenticateUser(appUser:AppUser):Observable<boolean>{
    this.authUser=appUser;
    localStorage.setItem("authusers",JSON.stringify({username:appUser.username,roles:appUser.roles,jwt:"JWT_TOKEN"}));
    return of(true);
  }
  public hasRole(role:string):boolean{
   return this.authUser!.roles.includes(role);
  }
  public isAuthenticated():boolean{
    return this.authUser!=undefined;
  }
  public logOut():Observable<boolean>{
    this.authUser=undefined;
    localStorage.removeItem("authusers");
    return of(true);
  }
}
