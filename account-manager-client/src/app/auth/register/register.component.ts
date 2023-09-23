import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private authService: AuthService) {
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ])
  })

  onRegister() {
    this.authService.register(
      this.registerForm.value.username as string,
      this.registerForm.value.email as string,
      this.registerForm.value.phone as string,
      this.registerForm.value.password as string
    );
  }
}
