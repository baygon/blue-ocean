export interface MenuItem {
  id: string
  label: string
  path: string
}

export interface Section {
  id: string
  title: string
  body: string
}

export interface Theme {
  background: string
  text: string
}

export interface CasinoApiResponse {
  name: string
  template: string
  theme: Theme
  menu: MenuItem[]
  sections: Section[]
  sidebar?: 'left' | 'right'
}
