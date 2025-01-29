import { useKanban } from '@/context/kanban/kanbanContext'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import React from 'react'
import { Column } from './components/column/'
import { moveCard } from './kanban.business'
import { CardContent } from './model'

export const KanbanContainer: React.FC = () => {
  const { state: kanbanState, dispatch } = useKanban()

  React.useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0]
        if (!destination) return

        const card = source.data.card as CardContent
        const columnId = destination.data.columnId as number
        const destinationCardId = destination.data.cardId as number

        dispatch({
          type: 'update-kanban',
          payload: moveCard(
            card,
            { columnId, cardId: destinationCardId },
            kanbanState
          )
        })
      }
    })
  }, [kanbanState.columns])

  if (!kanbanState.columns) return

  return (
    <div
      //  className={classes.container}
      className='flex gap-4'
    >
      {kanbanState.columns.map(column => (
        <Column
          key={column.id}
          name={column.name}
          content={column.content}
          columnId={column.id}
        />
      ))}
    </div>
  )
}
