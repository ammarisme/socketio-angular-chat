import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private chat : ChatService, private http : Http, private router : Router, private auth : AuthService){}
  connection;
  users = [];
  userMessage;
  myToken;
  myName;
  // messages   = [];
  otheruser ;
  showingMessages = [];

  ngOnInit(): void {
    this.myToken = localStorage.getItem('token');
    this.myName = localStorage.getItem('myName')
    
    this.chat.usersConnectedObservable.subscribe(connectedUsers => {
      this.users = connectedUsers;
     });

    this.http.get('http://localhost:3000/connectedusers' ).subscribe(res =>{
      this.users = JSON.parse((<any>res)._body);
      if(this.users.length ==0){
        this.router.navigate(['./login']);
      }
    });
    this.chat.messageRecievedObservable.subscribe(message =>{
      console.log(message);
      // this.messages.push(message);
      this.getShowingMessages();
    })

    // this.messages = this.chat.messages;
    this.showingMessages = this.chat.messages;
  }

  getShowingMessages(){
    this.showingMessages = [];
    for(var key in this.chat.messages ){
      if((this.chat.messages[key].reciever == this.myToken && this.chat.messages[key].sender == this.otheruser) || (this.chat.messages[key].reciever == this.otheruser && this.chat.messages[key].sender == this.myToken )){
        this.showingMessages.push(this.chat.messages[key]);
      }
    }
    console.log(this.showingMessages);
  }

  getLastMessageOf(user){
    var lastMessage;
    for(var key in this.chat.messages ){
      if((this.chat.messages[key].reciever == user.token || this.chat.messages[key].sender == user.token) && (this.chat.messages[key].reciever == this.myToken || this.chat.messages[key].sender == this.myToken ) ){
        lastMessage = this.chat.messages[key].message;
      }
    }
    return lastMessage;
  }
  
 currentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var minutesS = minutes < 10 ? '0' +minutes : minutes;
  var strTime = hours + ':' + minutesS + ' ' + ampm;
  return strTime;
}
  onClickSendMessage(event){
    var mes = {
      reciever :this.otheruser,
      sender : this.myToken,
      message : this.userMessage,
      sentTime : this.currentTime()
    };
    
    this.chat.send(mes);
    this.getShowingMessages();
    this.userMessage = '';
  }

  initiateChat(user){
    this.otheruser = user.token;
    this.getShowingMessages();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
