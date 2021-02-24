export interface TwindyNotification {
  id?: string
  active?: boolean
  title: string
  message?: string
  timeout?: number
  confirm?: (id: string) => void
  cancel?: (id: string) => void
}

export interface TwindyMenuItem {
  id: string
  title?: string
  checked?: boolean
  action: (item: any) => void
}
