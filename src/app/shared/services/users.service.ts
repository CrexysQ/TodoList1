import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';

import { Router } from '@angular/router';

@Injectable()
export class UserService implements OnDestroy {
  private users: User[] = [];
  public currentUser: User;
  public isAuthorized = false;

  constructor(
    private router: Router,
  ) {
      if ((localStorage.getItem('users')) !== null) {
        this.users = JSON.parse(localStorage.getItem('users'));
      } else {
        this.users = [];
      }

      if ((localStorage.getItem('currentUser')) !== null) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = this.users[this.currentUser.id];
      } else if ((sessionStorage.getItem('currentUser')) !== null) {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      } else {
        return;
      }
  }

  public isLoggedIn(): boolean {
    return this.isAuthorized;
  }

  saveUserChanges() {
    this.users[this.currentUser.id] = this.currentUser;
    if (localStorage.getItem('currentUser') !== null) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else if (sessionStorage.getItem('currentUser') !== null) {
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public getUser(email: string, password: string, isRemember: boolean): void {
    localStorage.getItem('users');
    for (const user in this.users) {
      if ( Number(user) < this.users.length) {
        if ((this.users[user].email === email) && (this.users[user].password === password)) {
          this.currentUser = this.users[user];
          if (isRemember) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.currentUser = this.users[user];
          }
          break;
        }
      } else {
        alert('Такого пользователя не существует');
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
      tasks: [],
      theme: '',
      time: {
        hours: 0,
        minutes: 0
      }
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.saveUserChanges();
  }
}
