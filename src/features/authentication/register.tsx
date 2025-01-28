import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IRegisterPayload, register } from '@/services/api/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string()
})

export default function Register() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  const registerMutation = useMutation<AxiosResponse, Error, IRegisterPayload>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/')
    },
    onError: error => {
      console.error('Register gagal:', error)
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerMutation.mutate(data)
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-full max-w-sm pt-6 md:max-w-xl'>
        {/* <form onSubmit={handleSubmit}> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full'>
                {registerMutation.isPending ? 'Loading' : 'Register'}
              </Button>
              <p className='text-center text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-500 hover:underline'>
                  Login here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
