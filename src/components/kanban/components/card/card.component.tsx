import { Badge } from '@/components/ui/badge'
import {
  Card as CardComponent,
  CardContent as CardContentComponent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  draggable,
  dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import React, { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import { CardContent } from '../../model'
import { GhostCard } from '../ghost-card/ghost-card.component'

interface Props {
  columnId: number
  content: CardContent
}

export const Card: React.FC<Props> = props => {
  const { content, columnId } = props
  const [dragging, setDragging] = useState<boolean>(false)
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    // Add this to avoid typescript in strict mode complaining about null
    // on draggable({ element: el }); call
    invariant(el)

    return draggable({
      element: el,
      getInitialData: () => ({ card: content }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false)
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    invariant(el)

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId, cardId: content.id }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false)
    })
  }, [])

  return (
    <>
      <GhostCard show={isDraggedOver} />
      <div
        ref={ref}
        // className={classes.card}
        className='w-full'
        style={{
          opacity: dragging ? 0.4 : 1
          // background: isDraggedOver ? 'lightblue' : 'white'
        }}
      >
        <CardComponent>
          <CardHeader>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription>
              <div className='line-clamp-2'>{content.description}</div>
            </CardDescription>
          </CardHeader>
          <CardContentComponent>
            <div className='flex flex-wrap gap-2'>
              {content.assignTo.map(item => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </CardContentComponent>
        </CardComponent>

        {/* <div className='flex flex-col'>
          <div className='mb-4 font-semibold'>{`${content.id} - ${content.title}`}</div>
          <div className='mb-4 line-clamp-2 text-muted-foreground'>
            {content.description}
          </div>
          <div>{content.assignTo}</div>
        </div> */}
      </div>
    </>
  )
}
