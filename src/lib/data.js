import { db } from '@/lib/mysql'
import { unstable_noStore } from 'next/cache';

export async function getArticulos() {
    unstable_noStore();

    try {
        // Retardo artificial para fines demostrativos.
        // No realizar en la vida real :)
        console.log('Recuperando artículos...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const results = await db.query('select * from articulos');
        console.log(results);

        return results;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}
