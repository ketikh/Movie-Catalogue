import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface SignInForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  signIn({email,password}: SignInForm) {
    if(!email || !password) {
      return;
    }

    this.auth.signIn({email,password}).then(()=>{
      this.router.navigate(['catalogue']);
    });
  }

  ngOnInit(): void {
  }

}
