export interface DataTableRegistryBehavior<T> {
  register(component: T): void
  get(name: string): T
}
