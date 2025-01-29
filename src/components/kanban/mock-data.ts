import { IStateKanban } from '@/context/kanban/kanbanTypes'

// TODO: Move this in the future outside the kanban component folder
export const mockData: IStateKanban = {
  columns: [
    {
      id: 1,
      name: 'TO DO',
      content: [
        {
          id: 1,
          title: 'Create the cards',
          description: 'Description of Place the cards in the columns',
          assignTo: ['Front End', 'Back End']
        },
        {
          id: 2,
          title: 'Place the cards in the columns',
          description: 'Description of Place the cards in the columns ',
          assignTo: ['Front End']
        },
        {
          id: 3,
          title: 'Implement card dragging',
          description: 'Description of Implement card dragging ',
          assignTo: ['Front End']
        },
        {
          id: 4,
          title: 'Implement drop card',
          description: 'Description of Implement drop card ',
          assignTo: ['Front End']
        },
        {
          id: 5,
          title: 'Implement drag & drop column',
          description: 'Description of Implement drag & drop column ',
          assignTo: ['UI/UX Designer']
        }
      ]
    },
    {
      id: 2,
      name: 'Doing',
      content: [
        {
          id: 6,
          title: 'Delete a card',
          description: 'Description of Delete a card',
          assignTo: ['Front End']
        }
      ]
    },
    {
      id: 3,
      name: 'Done',
      content: [
        {
          id: 7,
          title: 'Create boilerplate',
          description: 'Description of Create boilerplate',
          assignTo: ['Front End']
        },
        {
          id: 8,
          title: 'Define data model',
          description: 'Description of Define data model',
          assignTo: ['Back End']
        },
        {
          id: 9,
          title: 'Create columns',
          description: 'Description of Create columns',
          assignTo: ['Front End']
        }
      ]
    }
  ]
}
