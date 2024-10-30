import { AsyncPipe, JsonPipe } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { IncludesPipe } from '@x-angular/utils'
import { toString } from 'lodash-es'

@Component({
  selector: '[app-side-nav]',
  standalone: true,

  imports: [RouterLink, JsonPipe, AsyncPipe, IncludesPipe],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  route = inject(Router)
  activeItem = signal('')
  sidenavItems = [
    { title: 'Analytics', link: '../dashboard/analytics' },
    { title: 'Users', link: '../dashboard/users' },
    { title: 'Posts', link: '../dashboard/posts' },
  ]

  ngOnInit(): void {
    this.activeItem.set(this.route.url)
  }

  onClick(route: string): void {
    this.activeItem.set(route)
  }
}
