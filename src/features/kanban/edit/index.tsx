import { loadKanbanContent } from '@/components/kanban/api'
import { Column } from '@/components/kanban/model'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useKanban } from '@/context/kanban/kanbanContext'
import { roles_assignment } from '@/lib/const'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod'

const FormSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string(),
  assignTo: z.array(z.string())
})

export default function EditKanban() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state, dispatch } = useKanban()

  const [selectedColumn, setselectedColumn] = useState<Column | null>(null)

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [dispatch])

  const lastId = state.columns.reduce(
    (acc, current) => acc + current.content.length,
    0
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: lastId,
      title: '',
      description: '',
      assignTo: []
    }
  })

  useEffect(() => {
    let selectedColumn, selectedCard

    state.columns.forEach(column => {
      const matchedCards = column.content.filter(item => item.id === Number(id))
      if (matchedCards.length > 0) {
        selectedColumn = column
        selectedCard = matchedCards[0]
      }
    })

    if (selectedColumn) setselectedColumn(selectedColumn)
    if (selectedCard) form.reset(selectedCard)
  }, [state.columns])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!selectedColumn?.name) return

    const payload = {
      columns: state.columns.map(column =>
        column.name === selectedColumn.name
          ? {
              ...column,
              content: [
                ...column.content.filter(item => item.id !== Number(id)),
                data
              ]
            }
          : column
      )
    }
    dispatch({ type: 'update-kanban', payload })
    navigate(`/kanban/detail/${id}`)
  }

  const handleDelete = () => {
    if (!selectedColumn?.name) return

    const payload = {
      columns: state.columns.map(column =>
        column.name === selectedColumn.name
          ? {
              ...column,
              content: [
                ...column.content.filter(item => item.id !== Number(id))
              ]
            }
          : column
      )
    }

    dispatch({ type: 'update-kanban', payload })
    navigate(`/kanban/detail/${id}`)
  }

  const DeleteTask = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'destructive'} className='ml-auto' type='button'>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Are you sure to delete the task ?</DialogTitle>
            <DialogDescription>Data will be lost !</DialogDescription>
          </DialogHeader>
          <DialogFooter className='sm:justify-end'>
            <DialogClose asChild>
              <Button className='w-[100px]' type='button' variant='secondary'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className='w-[100px]'
              type='button'
              onClick={handleDelete}
              variant='secondary'
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (Object.keys(selectedColumn || {}).length === 0) {
    return <div>no data</div>
  }

  return (
    <div className='flex flex-col'>
      <div className='text-xl font-bold'>Edit Task</div>

      <Card className='my-8 p-8 px-16'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='id'
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Fill Title' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Fill Description' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='assignTo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to</FormLabel>
                  <FormControl>
                    {/* <Input placeholder='Fill Assign to' {...field} /> */}
                    <FancyMultiSelect
                      placeholder={'Select Assignment'}
                      className='col-span-3'
                      // onChange={value => handleFormChange('assignTo', value)}
                      {...field}
                      values={roles_assignment}
                      defaultValues={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex'>
              <DeleteTask />
              <Button className='ml-4' type='submit'>
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
