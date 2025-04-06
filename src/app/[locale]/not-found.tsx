import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center space-y-20'>
      <h2 className='text-7xl'>404 | This page could not be found</h2>
      <Link href="/" className='text-white hover:text-secondary-200 hover:underline text-5xl font-rhomdon'>Return Home</Link>
    </div>
  )
}