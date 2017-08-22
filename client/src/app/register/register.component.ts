import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../shared/auth.service';

import { User } from "../shared/user";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user:User;

  formErrors = {
    'username':'',
    // 'firstname': '',
    // 'lastname': '',
    'email': '',
    'password': '',
    // 'confirmPassword':'',
  };

  validationMessages = {
    'username': {
      'required':      'User Name is required.',
      'minlength':     'User Name must be at least 2 characters long.',
      'maxlength':     'User Name cannot be more than 25 characters long.'
    },
    // 'firstname': {
    //   'required':      'First Name is required.',
    //   'minlength':     'First Name must be at least 2 characters long.',
    //   'maxlength':     'FirstName cannot be more than 25 characters long.'
    // },
    // 'lastname': {
    //   'required':      'Last Name is required.',
    //   'minlength':     'Last Name must be at least 2 characters long.',
    //   'maxlength':     'Last Name cannot be more than 25 characters long.'
    // },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'password': {
      'required':       'Password is required',
      'minlength':      'Password must be a minimum length of 4 characters long',
    }
  };

  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router) { 
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      // firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      // lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.email] ],
      password:['',[Validators.required, Validators.minLength(2)]]
    });

    this.registrationForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(){
    this.auth.register(this.registrationForm.value).subscribe(
      data=>{this.router.navigate(['/login']);},
      error=>{console.log(error);})
  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}

