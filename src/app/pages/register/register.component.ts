// pages/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { registerMocks } from '../../core/mocks/register.mocks';
import { loginMocks } from '../../core/mocks/login.mocks';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  loginMocks = loginMocks;
  registerMocks = registerMocks;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  termsAccepted = false;

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {
    console.log('📝 RegisterComponent initialized');
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onSubmit() {
    console.log('📝 RegisterComponent - onSubmit called');
    console.log('📝 Register data:', { 
      username: this.registerData.username,
      email: this.registerData.email,
      passwordLength: this.registerData.password.length,
      termsAccepted: this.termsAccepted
    });
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validate passwords match
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.log('❌ RegisterComponent - Password mismatch');
      this.errorMessage = this.getCurrentText(registerMocks.passwordMismatchError);
      this.isLoading = false;
      return;
    }

    // Validate terms accepted
    if (!this.termsAccepted) {
      console.log('❌ RegisterComponent - Terms not accepted');
      this.errorMessage = this.getCurrentText(registerMocks.termsError);
      this.isLoading = false;
      return;
    }

    // Try to register
    if (this.authService.register(this.registerData)) {
      this.successMessage = this.getCurrentText(registerMocks.successMessage);
      setTimeout(() => {
        this.router.navigate([this.languageService.getCurrentLanguageCode(), 'profile']);
      }, 1500);
    } else {
      this.errorMessage = this.getCurrentText(registerMocks.userExistsError);
    }
    
    this.isLoading = false;
  }
}