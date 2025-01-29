import { loadKanbanContent } from '@/components/kanban/api'
import { CardContent } from '@/components/kanban/model'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useKanban } from '@/context/kanban/kanbanContext'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DetailKanban() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state, dispatch } = useKanban()

  const [form, setForm] = useState<CardContent>({
    id: Number(id),
    title: '',
    description: '',
    assignTo: []
  })

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [dispatch])

  useEffect(() => {
    let selectedCard

    state.columns.forEach(column => {
      const matchedCards = column.content.filter(item => item.id === Number(id))
      if (matchedCards.length > 0) {
        selectedCard = matchedCards[0]
      }
    })

    if (selectedCard) setForm(selectedCard)
  }, [state.columns, id])

  return (
    <div className='flex flex-col'>
      <div className='text-xl font-bold'>Detail Task</div>

      <Card className='my-8 p-8 px-16'>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='text-right'>ID</div>
            <div className='col-span-3 text-muted-foreground'>{form.id}</div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='text-right'>Title</div>
            <div className='col-span-3 text-muted-foreground'>{form.title}</div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='text-right'>Description</div>
            <div className='col-span-3 text-muted-foreground'>
              {form.description}
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='text-right'>Assign to</div>
            <div className='col-span-3 text-muted-foreground'>
              {form.assignTo.join(', ')}
            </div>
          </div>
        </div>
      </Card>

      <div className='flex'>
        <Button
          className='ml-auto'
          type='submit'
          onClick={() => navigate(`/kanban/edit/${id}`)}
        >
          Edit / Delete
        </Button>
      </div>
    </div>
  )
}
