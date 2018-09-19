import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ChatService } from '../chat.service';
import { User } from '../user/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username="";
  user : User = new User();

  constructor(private chat :ChatService, private router: Router, private auth : AuthService){}

  ngOnInit(){
  } 

  login(event){
    this.chat.initSocket(this.username);
    this.chat.register(this.username);
    this.chat.tokenObservable.subscribe(token =>{
    localStorage.setItem('token', token);
    localStorage.setItem('myName', this.username);
    this.router.navigate(['/home']);
  });
}
}