import Footer from '../../componets/utils/essentials/Footer'
import Header from '../../componets/utils/essentials/Header'

interface Props {
  title: string
  children: React.ReactNode
}

export default function HomeLayout ({ title, children }: Props) {
  return (
    <>
      <Header />
      <div className='relative min-h-max flex flex-col shadow-custom-soft mt-4 rounded-sm z-50'>
        <div className='border-b border-gray-200 rounded-t-sm bg-gray-100 z-20 text-left py-2 px-4'>
          <p>{title}</p>
        </div>
        <main className='p-4'>{children}</main>
      </div>
      <Footer />
    </>
  )
}
