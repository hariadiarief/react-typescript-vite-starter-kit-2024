import { KanbanContainer } from '@/components/kanban'
import { loadKanbanContent } from '@/components/kanban/api'
import { Button } from '@/components/ui/button'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useKanban } from '@/context/kanban/kanbanContext'
import { useEffect } from 'react'
import { Link } from 'react-router'

export default function Kanban() {
  const { dispatch } = useKanban()

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [dispatch])

  return (
    <div className='flex flex-col space-y-4'>
      <h3 className='text-xl font-bold'>Kanban</h3>
      <Link to='/kanban/create'>
        <Button variant='outline'>Create New Task</Button>
      </Link>

      <ScrollArea className='w-full whitespace-nowrap rounded-md border p-2'>
        <KanbanContainer />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}
