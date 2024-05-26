import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Login() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className='flex min-h-screen w-screen container'>
            <div className='w-[40%] md:flex items-center justify-center hidden'>
                <img
                    className='w-[500px]'
                    src={new URL('@/assets/login.png', import.meta.url).href}
                    alt=''
                />
            </div>
            <div className='flex justify-center items-center w-full md:w-[60%]'>
                <Card className='w-full md:w-[50%]'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl'>
                            Create an account
                        </CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <form onSubmit={onSubmit} className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input id='password' type='password' />
                            </div>

                            <Button disabled={isLoading} className='w-full'>
                                {isLoading && (
                                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                                )}
                                Create account
                            </Button>
                        </form>

                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t' />
                            </div>
                            <div className='relative flex justify-center text-xs '>
                                <span className='bg-background px-2 text-muted-foreground'>
                                    or continue with
                                </span>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <Button disabled={isLoading} variant='outline'>
                                <Icons.gitHub className='mr-2 h-4 w-4' />
                                Github
                            </Button>
                            <Button disabled={isLoading} variant='outline'>
                                <Icons.google className='mr-2 h-4 w-4' />
                                Google
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-center'>
                        <Button disabled={isLoading} variant='ghost'>
                            Already a user?
                            <span className='underline ml-2'>Login </span>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
