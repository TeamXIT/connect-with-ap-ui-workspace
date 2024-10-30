import { HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { get, isEmpty, isNil, keysIn } from 'lodash-es'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = signal<string>('')
  private _isAuthenticated = signal<boolean>(false)

  setToken(token: string) {
    this._token.set(token)
    if (isNil(token) || isEmpty(token)) {
      this._isAuthenticated.set(false)
      return
    }
    this._isAuthenticated.set(true)
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Auth-Token', this._token())
  }

  buildParams({ ...args }): HttpParams {
    return new HttpParams().appendAll(args)
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated()
  }
}
