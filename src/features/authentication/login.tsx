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
import { useAuth } from '@/context/auth/authContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'

const FormSchema = z.object({
  identifier: z.string().email(),
  password: z.string()
})

export default function Login() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  // const { mutate: loginMutation, isPending } = useMutation<
  //   ILoginResponse,
  //   Error,
  //   ILoginPayload
  // >({
  //   mutationFn: login,
  //   onSuccess: data => {
  //     const payload = {
  //       token: data.jwt,
  //       user: {
  //         username: data.user.username,
  //         email: data.user.email
  //       }
  //     }

  //     localStorage.setItem('auth', JSON.stringify(payload))
  //     dispatch({ type: 'login', payload })
  //   },
  //   onError: error => {
  //     console.error('Login gagal:', error)
  //   }
  // })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      token: 'fake-token',
      user: {
        email: data.identifier,
        username: data.identifier
      }
    }

    localStorage.setItem('auth', JSON.stringify(payload))
    dispatch({ type: 'login', payload })
    navigate('/')
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-full max-w-sm pt-6 md:max-w-xl'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='identifier'
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
                Login
              </Button>
              <p className='text-center text-sm'>
                Don't have an account?{' '}
                <Link to='/register' className='text-blue-500 hover:underline'>
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
