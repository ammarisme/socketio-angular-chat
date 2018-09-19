import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { ChatService } from './chat.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ChatService, AuthService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }