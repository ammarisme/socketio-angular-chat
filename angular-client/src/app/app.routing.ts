import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./auth-guard.service";


const appRouter : Routes = [
    {path : '' , component : LoginComponent},
    {path : 'login' , component : LoginComponent},
    {path : 'home' , canActivate : [AuthGuard], component : HeaderComponent}
  ]
@NgModule({
    imports  : [
        RouterModule.forRoot(appRouter)
    ],
    exports : [RouterModule]
})
export class AppRoutingModule{

}