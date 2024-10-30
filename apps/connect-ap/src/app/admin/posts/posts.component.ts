import { Component, inject, OnInit, signal } from '@angular/core'
import { DataTableComponent } from '@x-angular/data-table'
import { PostsDataService } from '../../services/posts-data.service'
import { map, takeUntil } from 'rxjs'
import { Destroyer } from '../../shared/config/components/on-destroy.component'
import { get } from 'lodash-es'
import { CONFIGURATION } from './config/posts-table-config'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './posts.component.html',
})
export class PostsComponent extends Destroyer implements OnInit {
  configuration = CONFIGURATION
  private _postsDataService = inject(PostsDataService)

  data = signal([])
  async ngOnInit(): Promise<void> {
    const params = { limit: 1000, page: 1 }
    this._postsDataService
      .getPosts(params)
      .pipe(takeUntil(this.subscriptions$))
      .pipe(
        map(response => {
          return get(response, 'data', [])
        }),
      )
      .subscribe({ next: this.data.set, error: console.log })
  }
}
