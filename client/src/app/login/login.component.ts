import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl:string;
  loginForm:FormGroup;

  constructor(private authservice:AuthService,private fb:FormBuilder,private route:ActivatedRoute,private router:Router) { 
    this.createForm();
    }

  ngOnInit() {
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password:['',[Validators.required, Validators.minLength(2)]]
    });
  }

  login(){
    this.authservice.login(this.loginForm.value).subscribe(
      data=>{this.router.navigate([this.returnUrl]);},
      error=>{console.log(error);}
    )
  }
}
