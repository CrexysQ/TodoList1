import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TimerService } from 'src/app/shared/services/timer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl
  public currentUser: User;
  private remember: boolean = false;

  constructor(
    private users: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private timerService: TimerService
    ) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]),

    this.form = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter an Email' : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a Password' : this.password.hasError('minlength') ? 'Your password must contain min 8 symbols' : '';
  }

  rememberMe() {    
    this.remember = !this.remember;
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.users.getUser(formData.email, formData.password, this.remember);

    if (this.users.currentUser !== undefined) {
      this.router.navigate(['system/todo']);
    }
    this.timerService.getTime();
  }
}
