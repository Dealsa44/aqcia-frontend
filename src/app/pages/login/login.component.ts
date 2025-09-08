// pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { loginMocks } from '../../core/mocks/login.mocks';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    emailOrUsername: '',
    password: ''
  };
  loginMocks = loginMocks;
  errorMessage = '';
  isLoading = false;

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {
    console.log('🔐 LoginComponent initialized');
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onSubmit() {
    console.log('🔐 LoginComponent - onSubmit called');
    console.log('🔐 Login data:', { 
      emailOrUsername: this.loginData.emailOrUsername,
      passwordLength: this.loginData.password.length 
    });
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Try API login first
    this.attemptApiLogin();
  }

  attemptApiLogin() {
    console.log('🔐 LoginComponent - attemptApiLogin called');
    
    // For now, fallback to local auth service
    // In a real app, you'd call the API here
    if (this.authService.login(this.loginData.emailOrUsername, this.loginData.password)) {
      console.log('✅ LoginComponent - Login successful');
      this.router.navigate([this.languageService.getCurrentLanguageCode(), 'profile']);
    } else {
      console.log('❌ LoginComponent - Login failed');
      this.errorMessage = this.getCurrentText(loginMocks.errorMessage);
    }
    
    this.isLoading = false;
  }
}