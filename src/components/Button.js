'use client'
import { useFormStatus } from 'react-dom'

function Button({ action, title }) {
    const { pending } = useFormStatus()

    return (
        <button formAction={action} disabled={pending}>
            { pending ? 'Realizando operación...' : title }
        </button>
    )
}

export default Button