import React from 'react'
import { Link } from 'react-router'
import { CardContent } from '../../model'
import { Card } from '../card/'
import { EmptySpaceDropZone } from '../empty-space-drop-zone.component'

interface Props {
  columnId: number
  name: string
  content: CardContent[]
}

export const Column: React.FC<Props> = props => {
  const { columnId, name, content } = props

  return (
    <div
      // className={classes.container}
      className='flex min-h-screen flex-col gap-2 rounded-md bg-slate-200 p-2'
    >
      <h4 className='min-w-[300px] text-center font-bold'>{name}</h4>
      {content.map(card => (
        <Link to={`/kanban/detail/${card.id}`} key={card.id}>
          <Card content={card} columnId={columnId} />
        </Link>
      ))}
      <EmptySpaceDropZone columnId={columnId} />
    </div>
  )
}
