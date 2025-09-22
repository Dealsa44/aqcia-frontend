// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    this.loadUser();
  }

  private loadUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(emailOrUsername: string, password: string): boolean {
    // In a real app, this would be an API call
    const users = this.getUsers();
    const user = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && 
      u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  register(userData: any): boolean {
    const users = this.getUsers();
    
    // Check if username or email already exists
    const exists = users.some(u => 
      u.username === userData.username || u.email === userData.email
    );
    
    if (exists) return false;
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    this.login(userData.email, userData.password);
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate([this.languageService.getCurrentLanguageCode(), 'catalog']);
  }

  updateProfile(updatedUser: any): boolean {
    const users = this.getUsers();
    const currentUser = this.currentUserSubject.value;
    
    // Check if new username or email is taken by another user
    const exists = users.some(u => 
      u.id !== currentUser.id && 
      (u.username === updatedUser.username || u.email === updatedUser.email)
    );
    
    if (exists) return false;
    
    // Update user data
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      users[index] = {...currentUser, ...updatedUser};
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
      this.currentUserSubject.next(users[index]);
      return true;
    }
    return false;
  }

  resetPassword(email: string, username: string, newPassword: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.username === username);
    
    if (user) {
      user.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  }

  private getUsers(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}