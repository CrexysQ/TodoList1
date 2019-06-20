import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private users: User[] = [];
  public currentUser: User;
  public isAuthorized = false;
  // private admin: User;

  constructor(
    private router: Router,
  ) {
      // this.admin = {
      //   email: 'admin@admin.com',
      //   password: 'Qwerty123',
      //   name: 'Admin',
      //   id: 0,
      //   isLogin: false,
      //   tasks: {
      //     status: false,
      //     text: '',
      //     taskStatus: 0,
      //     taskTime: {
      //       hours: 0,
      //       minutes: 0
      //     }
      //   }
      // };
      // this.users.push(this.admin);
      // localStorage.setItem('users', JSON.stringify(this.users));
      this.users = JSON.parse(localStorage.getItem('users'));
      this.isAuthorized = JSON.parse(localStorage.getItem('isLoggedIn'));
  }

  public isLoggedIn(): boolean {
    return this.isAuthorized;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getUser(email: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('users'));

    for (const user in users) {
      if ((users[user].email === email) && (users[user].password === password)) {
        this.isAuthorized = true;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isAuthorized));
        this.currentUser = users[user];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        break;
      } else {
        this.isAuthorized = false;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isAuthorized));
      }
    }

  }

  public setUser(userEmail: string, userPassword: string, userName: string): void {
    const userId = this.users.length;
    const newUser: User = {
      email: userEmail,
      password: userPassword,
      name: userName,
      id: userId,
      isLogin: false
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['/login']);
  }
}
