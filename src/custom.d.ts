type ErrorsFor<T> = {
  [K in keyof T]?: string[]
} | null
