import { Component, inject } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {
  authService = inject(AuthService)
}
