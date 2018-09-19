import { Injectable } from '@angular/core';
import {  Observer ,Observable ,BehaviorSubject } from 'rxjs';

import * as socketIo from 'socket.io-client';
import { Message } from './message/message';

const SERVER_URL = 'http://localhost:3000';

    @Injectable()
    export class ChatService {
        constructor(){}
    
        
        private socket;
        private messageData :any =[];
        public tokenObservable;
        public connectObservable;
        public usersConnectedObservable;
        public messageRecievedObservable;
        public messages :Message[] =[];
        public currentlyChattingOtherUser : string;

        public register(user){
            
            this.socket.emit('register' , user);
        }

        public initSocket(username): void {
            this.socket = socketIo(SERVER_URL);

            
        this.tokenObservable = new Observable(observer => {
            this.socket.on('token', (data) => {
            observer.next(data);
            })
            return () => {
            this.socket.disconnect();
            }
        });

        this.connectObservable = new Observable(observer => {
            this.socket.on('connect', (data) => {
            observer.next(data);
            })
            return () => {
            this.socket.disconnect();
            }
        });

        this.usersConnectedObservable = new Observable(observer => {
            this.socket.on('usersconnected', (data) => {
            observer.next(data);
            })
            return () => {
            this.socket.disconnect();
            }
        });
        

        this.messageRecievedObservable = new Observable(observer => {
            this.socket.on('messagerecieved', (data) => {
                this.messages.push(data);
            observer.next(data);
            })
            return () => {
            this.socket.disconnect();
            }
        });
        }

        public send(message): void {
            this.messages.push(message);
            this.socket.emit('sendMessage', message);
        }

        public onMessage(): Observable<Message> {
            return new Observable<Message>(observer => {
                this.socket.on('message', (data: Message) =>{
                    this.messages.push(data);
                    observer.next(data)
                    });
            });
        }

        public GetConnectedUsers(){
            
        }
        // We define our observable which will observe any incoming messages
        // from our socket.io server.



            //Remember this will keep pushing items in your array as they arrive 
        //and keep returning messageData array
        public getMessages():Observable<any[]> {
            this.socket.onMessageArrived = (message: any) => {
                this.messageData.push(JSON.parse(message.payloadString));  
            };

            return Observable.create(observer => {
                observer.next(this.messageData);
                observer.complete();
            });;
        }
    }