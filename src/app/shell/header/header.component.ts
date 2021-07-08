import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  //check if lang is en
  get isEn(): boolean {
    return this.isLanguage('en');
  }

 //check if lang is ka
  get isKa(): boolean {
    return this.isLanguage('ka');
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  get isInitiated(): boolean {
    return this.auth.initiated;
  }

  constructor(private router: Router,private translateService: TranslateService,private auth: AuthService ) { }

  //check language
  private isLanguage(lang: string): boolean {
    const defaultLang = this.translateService.defaultLang;
    const currentLang = this.translateService.currentLang;

    return currentLang ? currentLang===lang : defaultLang===lang;
  }

  goToSignIn() {
    this.router.navigate(['sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  goToCatalogue() {
    this.router.navigate(['catalogue']);
  }

  //change language
  useKa() {
    this.translateService.use('ka');
  }

  //change language
  useEn() {
    this.translateService.use('en');
  }

  signOut() {
    this.auth.signOut().then(()=>{
      this.router.navigate(['sign-in']);
    });
  }

  ngOnInit(): void {
  }

}
