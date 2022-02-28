import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (
      this.loginForm.value?.email === 'admin' &&
      this.loginForm.value?.password === '123456'
    ) {
      const userInfo = {
        email: this.loginForm.value?.email,
        password: this.loginForm.value?.password,
      } as UserInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.router.navigate(['/movie/list']);
    }
  }
}
