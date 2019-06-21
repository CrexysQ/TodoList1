import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public currentUser: User;
  private remember: boolean = false;

  constructor(
    private users: UserService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  rememberMe() {
    this.remember = !this.remember;
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.users.getUser(formData.email, formData.password, this.remember);

    if (this.users.currentUser !== undefined) {
      this.router.navigate(['/todo']);
    }
  }

}
