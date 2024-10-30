import { DataTableOptions } from '@x-angular/data-table'

export const CONFIGURATION: DataTableOptions = {
  columns: [
    'userName',
    'mobileNumber',
    'role',
    'isActive',
    'createdAt',
    'updatedAt',
  ],
  headerOptions: {
    userName: {
      displayProp: 'User Name',
    },
    mobileNumber: {
      displayProp: 'Mobile Number',
    },
    role: {
      displayProp: 'Role',
    },
    isActive: {
      displayProp: 'Status',
    },
    createdAt: {
      displayProp: 'Created Date',
    },
    updatedAt: {
      displayProp: 'Updated Date',
    },
  },
  paginationOptions: {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50, 100],
    pageIndex: 1,
  },
  filterOptions: {
    columns: [
      'userName',
      'mobileNumber',
      'role',
      'isActive',
      'createdAt',
      'updatedAt',
    ],
  },
}
