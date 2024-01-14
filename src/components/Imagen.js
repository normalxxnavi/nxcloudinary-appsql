'use client'
import {
    changeHandler,
    dblclickHandler,
    dragOverHandler,
    dropHandler,

} from '@/lib/eventos'

function Imagen({ img }) {
    return (
        <>
            <img
                id='imgPreview'
                src={img}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDoubleClick={dblclickHandler}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            />
            <input type='file'
                name='file'
                accept='image/*'
                onChange={changeHandler}
                style={{ display: 'none' }}
            />
        </>
    )
}

export default Imagen