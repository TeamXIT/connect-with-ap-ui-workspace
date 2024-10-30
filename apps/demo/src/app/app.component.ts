import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DataTableComponent, DataTableOptions } from '@x-angular/data-table'
import { TableComponent } from './table/table.component'
import { COUNTRIES } from './table/countries'

@Component({
  standalone: true,
  imports: [RouterModule, DataTableComponent, TableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo'
  countries = COUNTRIES

  configuration: DataTableOptions = {
    columns: ['id', 'name', 'flag', 'area', 'population'],
    headerOptions: {
      id: {
        displayProp: 'ID',
      },
      name: {
        displayProp: 'Name',
      },
      flag: {
        displayProp: 'Flag',
      },
      area: {
        displayProp: 'Area',
      },
      population: {
        displayProp: 'Population',
      },
    },
    paginationOptions: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 50, 100],
      pageIndex: 1,
    },
    filterOptions: {
      columns: ['name', 'flag', 'population'],
    },
    sequenceOptions: {
      enableSequenceNo: true,
      sequenceHeader: 'Index',
    },
  }

  
}
