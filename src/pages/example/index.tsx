import { Button, Card, Switch } from 'antd'
import { useAppContext } from '@/contexts/appContext'

export default function About() {
    const { count, increment, decrement, isDark, setIsDark } = useAppContext()

    return (
        <div className='about container flex flex-col items-center justify-center'>
            <Switch
                checked={isDark}
                checkedChildren={<span>🌙</span>}
                unCheckedChildren={<span>🔆</span>}
                defaultChecked
                onChange={() => setIsDark(!isDark)}
            />
            <Card>
                <Button>Change Theme to</Button>
            </Card>
            <h1>hallo</h1>

            <div>
                <h1>Count: {count}</h1>
                <Button onClick={increment}>Increment</Button>
                <Button onClick={decrement}>Decrement</Button>
            </div>

            <hr />

            <div className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'>
                <h3 className='text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight'>
                    Writes Upside-Down
                </h3>
                <p className='text-slate-500 dark:text-slate-400 mt-2 text-sm'>
                    The Zero Gravity Pen can be used to write in any
                    orientation, including upside-down. It even works in outer
                    space.
                </p>
            </div>

            <img
                style={{ width: '50vw' }}
                src={'/images/logo.jpg'}
                alt=''
            />
        </div>
    )
}
