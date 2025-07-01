// pages/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { forgotPasswordMocks } from '../../core/mocks/forgot-password.mocks';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  resetData = {
    email: '',
    username: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  forgotPasswordMocks = forgotPasswordMocks;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  step: 'identify' | 'reset' = 'identify';

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {}

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onIdentifySubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // In a real app, we would verify the email and username exist together
    const users = this.authService['getUsers'](); // Access private method for demo
    const userExists = users.some(u => 
      u.email === this.resetData.email && u.username === this.resetData.username
    );
    
    if (userExists) {
      this.step = 'reset';
    } else {
      this.errorMessage = this.getCurrentText(forgotPasswordMocks.identificationError);
    }
    
    this.isLoading = false;
  }

  onResetSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    if (this.resetData.newPassword !== this.resetData.confirmNewPassword) {
      this.errorMessage = this.getCurrentText(forgotPasswordMocks.passwordMismatchError);
      this.isLoading = false;
      return;
    }
    
    if (this.authService.resetPassword(
      this.resetData.email, 
      this.resetData.username, 
      this.resetData.newPassword
    )) {
      this.successMessage = this.getCurrentText(forgotPasswordMocks.successMessage);
      setTimeout(() => {
        this.router.navigate([this.languageService.getCurrentLanguageCode(), 'login']);
      }, 1500);
    } else {
      this.errorMessage = this.getCurrentText(forgotPasswordMocks.resetError);
    }
    
    this.isLoading = false;
  }
}