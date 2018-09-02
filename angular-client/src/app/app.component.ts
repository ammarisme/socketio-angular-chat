import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  Repdata ;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  //   var db = mongo.connect("mongodb://locahost:27017/AngularCRUD", function(err, response){
  //     if(err){
  //         console.log('connection to mongodb faied');
  //         console.log(err);
  //     }else{
  //         console.log('connected to '+ db + ' + ', response);
  //     }
  // });
    
  }
}
