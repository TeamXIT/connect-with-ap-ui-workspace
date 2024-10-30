import { computed, signal } from '@angular/core'

export class DataManagerModel {
  private _dataSource = signal<any[]>([])

  // State signals for sorting, filtering, and pagination
  private _filterCriteria = signal<{ field: string; value: any } | null>(null)
  private _sortField = signal<string>('')
  private _sortOrder = signal<'asc' | 'desc'>('asc')
  private _currentPage = signal<number>(1)
  private _pageSize = signal<number>(10)

  public filteredSortedPaginatedData = computed(() => {
    let data = [...this._dataSource()]

    if (this._filterCriteria()) {
      data = this._applyFilter(data)
    }

    if (this._sortField()) {
      data = this._applySort(data)
    }

    return this._applyPagination(data)
  })

  setData(data: any[]) {
    this._dataSource.set(data)
  }

  sort(field: string, order: 'asc' | 'desc') {
    this._sortField.set(field)
    this._sortOrder.set(order)
  }

  filter(criteria: { field: string; value: any }) {
    this._filterCriteria.set(criteria)
  }

  paginate(page: number, pageSize: number) {
    this._currentPage.set(page)
    this._pageSize.set(pageSize)
  }

  resetSort() {
    this._sortField.set('')
    this._sortOrder.set('asc')
  }

  resetFilter() {
    this._filterCriteria.set(null)
  }

  private _applyFilter(data: any[]): any[] {
    const criteria = this._filterCriteria()
    if (criteria) {
      return data.filter(item => item[criteria.field] === criteria.value)
    }
    return data
  }

  private _applySort(data: any[]): any[] {
    return data.sort((a, b) => {
      const comparison = a[this._sortField()] > b[this._sortField()] ? 1 : -1
      return this._sortOrder() === 'asc' ? comparison : -comparison
    })
  }

  private _applyPagination(data: any[]): any[] {
    const startIndex = (this._currentPage() - 1) * this._pageSize()
    return data.slice(startIndex, startIndex + this._pageSize())
  }
}
