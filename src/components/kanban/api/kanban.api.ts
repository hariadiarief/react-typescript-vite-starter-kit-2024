import { mockData } from '../mock-data'
import { KanbanContent } from '../model'

// TODO: Move this outside kanban component folder
export const loadKanbanContent = async (): Promise<KanbanContent> => {
  const localData = JSON.parse(localStorage.getItem('mockData') || '{}')

  if (Object.keys(localData).length === 0) {
    return mockData
  } else {
    return localData
  }
}
