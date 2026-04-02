import Link from 'next/link'
import { Metadata } from 'next'
import { generatePageTitle } from '@/shared/utils/metadata'
import Heading from '@/components/typography/Heading'


const title = "Administra tus comunidades"
export const metadata: Metadata = {
  title: generatePageTitle(title),
}


export default function CommunitiesPage() {
  return (
    <>
      <Heading
        className='font-bold'
      >
        {title}
      </Heading>

      <div className="flex justify-between flex-col lg:flex-row">
        <Link
          href="/dashboard/communities/create"
          className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
        >Crear Comunidad</Link>
        <Link
          href="/dashboard/communities/joined"
          className="mt-5 block lg:inline-block text-center bg-pink-500 hover:bg-pink-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
        >Comunidades a las que te uniste</Link>
      </div>


    </>
  )
}
