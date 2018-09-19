import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { User } from './User';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user : User ;
  @Input() myToken : string;
  @Input() otherUser : string;
  
  chatActive : boolean = false;

  constructor(private chat : ChatService) { }

  ngOnInit() {
  }

  @Output() userIconClicked : EventEmitter<User> = new EventEmitter<User>();
  
  getLastMessageOf(user){
    var lastMessage;
    for(var key in this.chat.messages ){
      if((this.chat.messages[key].reciever == user.token || this.chat.messages[key].sender == user.token) && (this.chat.messages[key].reciever == this.myToken || this.chat.messages[key].sender == this.myToken ) ){
        lastMessage = this.chat.messages[key].message;
      }
    }
    return lastMessage;
  }

  initChat(){
    this.chatActive = true;
    this.userIconClicked.emit(this.user);
  }
}
