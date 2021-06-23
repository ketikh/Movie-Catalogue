import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }


  goToSignIn() {
    this.router.navigate(['sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  goToCatalogue() {
    this.router.navigate(['catalogue']);
  }

  ngOnInit(): void {
  }

}
