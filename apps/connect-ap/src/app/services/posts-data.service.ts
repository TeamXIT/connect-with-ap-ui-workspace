import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { API_CONFIG } from '../shared/config/config'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  private _http = inject(HttpClient)
  private _authService = inject(AuthService)

  getPosts({ ...params }): Observable<any> {
    return this._http.get(API_CONFIG.posts.get_api, {
      headers: this._authService.getHeaders(),
      params: this._authService.buildParams(params),
    })
  }
}
