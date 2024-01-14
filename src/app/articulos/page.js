import Link from 'next/link'
import { Suspense } from 'react'
import Articulos from '@/components/Articulos'
import ArticulosSkeleton from '@/components/ArticulosSkeleton'

export const dynamic = 'force-dynamic'

export default async function Page () {

    return (
        <div>
            <Link className='enlace' href="/articulos/new"> Nuevo artículo </Link>
            <Suspense fallback={<ArticulosSkeleton />}>
                <Articulos/> 
            </Suspense>
        </div>
    )
}
