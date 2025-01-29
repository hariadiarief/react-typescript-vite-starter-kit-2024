import { loadKanbanContent } from '@/components/kanban/api'
import { Button } from '@/components/ui/button'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

const FormSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string(),
  assignTo: z.array(z.string())
})

export default function CreateKanban() {
  const { dispatch, state } = useKanban()
  const navigate = useNavigate()

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
    if (lastId) {
      form.reset({
        id: lastId + 1,
        title: '',
        description: '',
        assignTo: []
      })
    }
  }, [lastId])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch({ type: 'add-kanban', payload: data })
    navigate('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
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
                  values={roles_assignment}
                  // onChange={value => handleFormChange('assignTo', value)}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Create Task</Button>
      </form>
    </Form>
  )
}
