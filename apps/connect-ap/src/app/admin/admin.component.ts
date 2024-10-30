import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './core/header/header.component'
import { SideNavComponent } from './core/side-nav/side-nav.component'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
