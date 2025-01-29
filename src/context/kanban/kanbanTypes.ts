// export interface IkanbanColumnContent {
//   id: number
//   title: string
//   description: string
//   assignTo: string[]
// }

import { CardContent, KanbanContent } from '@/components/kanban/model'

// export interface IkanbanColumns {
//   id: number
//   name: string
//   content: IkanbanColumnContent[]
// }

// export interface IStateKanban {
//   columns: IkanbanColumns[]
// }

export type IActionkanban = IActionkanbanAdd | IActionkanbanUpdate

export interface IActionkanbanAdd {
  type: 'add-kanban'
  payload: CardContent
}
export interface IActionkanbanUpdate {
  type: 'update-kanban'
  payload: KanbanContent
}
