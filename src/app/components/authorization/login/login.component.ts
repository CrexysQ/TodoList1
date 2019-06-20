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

  constructor(
    private users: UserService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

    this.route.queryParams
    .subscribe((params: Params) => {
      if (params['accessDenied']) {
        alert('sosi');
      }
    })
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.users.getUser(formData.email, formData.password);

    if (this.users.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      console.log('bed');
    }
  }

}
