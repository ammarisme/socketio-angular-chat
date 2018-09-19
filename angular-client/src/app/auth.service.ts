import { ChatService } from "./chat.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  loggedIn = false;

  constructor(private chat : ChatService){}
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
          resolve(localStorage.getItem('token')!=null);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    localStorage.clear();
    this.chat.disconnect();
    this.loggedIn = false;
  }
}
