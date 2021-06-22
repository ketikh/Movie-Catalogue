import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private translateServise: TranslateService){}
  
  useKa() {
    this.translateServise.use('ka');
  }
  
  useEn() {
    this.translateServise.use('en');
  }
  
  ngOnInit(): void {

  }
}
