import { inject, Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { API_CONFIG } from '../shared/config/config'

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _http = inject(HttpClient)
  private _authService = inject(AuthService)

  getUsers({ ...params }): Observable<any> {
    return this._http.get(API_CONFIG.users.get_api, {
      headers: this._authService.getHeaders(),
      params: this._authService.buildParams(params),
    })
  }
}
