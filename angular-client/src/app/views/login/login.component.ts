import { OnInit, Component , Input } from '@angular/core';
import { ChatService } from '../../chat.service';
import { User } from '../../../model/User';
import  { RouterModule, Routes , Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 
  username="";
  user : User = new User();

  constructor(private chat :ChatService, private router:Router){}

  ngOnInit(){
  } 

  login(event){
    this.chat.initSocket(this.username);
    this.chat.register(this.username);
    this.chat.tokenObservable.subscribe(token =>{
    localStorage.setItem('token', token);
    localStorage.setItem('myName', this.username);
    this.router.navigate(['./dashboard']);
  });
}
}