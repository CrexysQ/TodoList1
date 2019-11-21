import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl

  constructor(
    private usersService: UserService,
  ) {
  }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required]),
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]),

    this.form = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  public getNameErrorMessage(): string {
    return this.email.hasError('required') ? 'You must enter a Name' : '';
  }

  public getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'You must enter an Email' : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getPassErrorMessage(): string {
    return this.password.hasError('required') ? 'You must enter a Password' : this.password.hasError('minlength') ? 'Your password must contain min 8 symbols' : '';
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.usersService.setUser(formData.email, formData.password, formData.name);
  }
}
