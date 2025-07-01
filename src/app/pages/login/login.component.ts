// pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { loginMocks } from '../../core/mocks/login.mocks';

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
    private router: Router
  ) {}

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    if (this.authService.login(this.loginData.emailOrUsername, this.loginData.password)) {
      this.router.navigate([this.languageService.getCurrentLanguageCode(), 'profile']);
    } else {
      this.errorMessage = this.getCurrentText(loginMocks.errorMessage);
    }
    
    this.isLoading = false;
  }
}