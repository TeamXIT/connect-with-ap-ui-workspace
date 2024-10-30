import { HttpClient } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { get } from 'lodash-es'
import { takeUntil } from 'rxjs'
import { Destroyer } from '../../../shared/config/components/on-destroy.component'
import { API_CONFIG } from '../../../shared/config/config'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent extends Destroyer {
  formGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  })

  private _http = inject(HttpClient)
  private _router = inject(Router)
  private _authService = inject(AuthService)

  onSubmit() {
    this._login()
  }

  private _login(): void {
    this._http
      .post(API_CONFIG.admin.login_api, {
        ...this.formGroup.value,
      })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: data => {
          const token = get(data, 'data.token', '')
          this._setAuthToken(token)
          this._redirectToAdmin()
        },
        error: console.log,
      })
  }

  private _setAuthToken(token: string): void {
    this._authService.setToken(token)
  }

  private _redirectToAdmin(): void {
    this._router.navigate(['../../admin'])
  }
}
