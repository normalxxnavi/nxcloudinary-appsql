import Link from 'next/link'
import Articulo from '@/components/Articulo'
import { getArticulos } from '@/lib/actions'

export default async function Articulos() {
    // La siguiente operación tardará un poquito
    const articulos = await getArticulos()

    return (
        <>
            {
                articulos.map((articulo) => (
                   
                    <Articulo key={articulo.id} articulo={articulo} >
                        <Link
                            className='enlace'
                            href={{ pathname: '/articulos/edit', query: { id: articulo.id } }}>
                            Editar artículo
                        </Link>
                        <Link
                            className='enlace'
                            href={{ pathname: '/articulos/delete', query: { id: articulo.id } }}>
                            Eliminar artículo
                        </Link>
                    </Articulo>
                
                ))
            }
        </>
    )
}
