import { LayoutDashboardIcon, RssIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='bg-slate-50 min-h-screen'>
            <section
                id='features'
                className='container space-y-6  py-8 dark:bg-transparent md:py-12 lg:py-24'
            >
                <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
                    <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
                        Features
                    </h2>
                    <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
                        This project is an experiment to see how a modern app,
                        with features like auth, subscriptions, API routes, and
                        static pages would work in Next.js 13 app dir.
                    </p>
                </div>

                <div className='cursor-pointer mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2'>
                    <Link
                        className=' relative overflow-hidden rounded-lg border bg-background p-2'
                        to={'/blog'}
                    >
                        <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                            <RssIcon width={32} height={32} />
                            <div className='space-y-2'>
                                <h3 className='font-bold'>Blog</h3>
                                <p className='text-sm text-muted-foreground'>
                                    App dir, Routing, Layouts, Loading UI and
                                    API routes.
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        className='relative overflow-hidden rounded-lg border bg-background p-2'
                        to={'/dashboard'}
                    >
                        <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                            <LayoutDashboardIcon width={32} height={32} />

                            <div className='space-y-2'>
                                <h3 className='font-bold'>Dashboard </h3>
                                <p className='text-sm'>
                                    Server and Client Components. Use hook.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className='cursor-pointer mx-auto text-center md:max-w-[58rem]'>
                    <p className='leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
                        Taxonomy also includes a blog and a full-featured
                        documentation site built using Contentlayer and MDX.
                    </p>
                </div>
            </section>
        </div>
    )
}
