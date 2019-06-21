import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users.service';

@Component ({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    if (this.userService.currentUser != null) {
      this.router.navigate(['/todo']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
