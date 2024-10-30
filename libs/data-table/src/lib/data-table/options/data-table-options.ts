import { FilterOptions } from './filter-options'
import { HeaderOptions } from './header-options'
import { PaginationOptions } from './pagination-options'
import { SortingOptions } from './sorting-options'

export type DataTableOptions = {
  columns: string[]
  headerOptions: HeaderOptions
  filterOptions?: FilterOptions
  paginationOptions?: PaginationOptions
  sortingOptions?: SortingOptions
  sequenceOptions?: {
    enableSequenceNo: boolean
    sequenceHeader?: string
  }
}
