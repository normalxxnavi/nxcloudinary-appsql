'use server'
import { db } from '@/lib/mysql'
import { redirect } from 'next/navigation';
import cloudinary from '@/lib/cloudinary'
import { unstable_noStore } from 'next/cache';

/*
OPERACIONES CRUD

C: CREATE -> newArticulo
R: READ   -> getArticulos
U: UPDATE -> editArticulo
D: DELETE -> deleteArticulo

*/


async function imgCreate(file) {
  console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 600, aspect-ratio: 1
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      folder: "tienda",
      public_id: file.name,
      aspect_ratio: "1.0",
      width: 600,
      crop: "fill",
      gravity: "center"
    })
    console.log(result);
    return result.secure_url
  } catch (error) {
    console.log(error);
    return null
  }
}


export async function getArticulos() {
  unstable_noStore()  // para no cachear datos

  try {
    // Retardo artificial para fines demostrativos.
    // No realizar en la vida real :)
    console.log('Recuperando artículos...');
    await new Promise((resolve) => setTimeout(resolve, 3000));


    const results = await db.query('select * from articulos');
    console.log(results);

    return results;
  } catch (error) {
    console.log(error);  
    return null;
  }
}

export async function newArticulo(formData) {
  try {
    const nombre = formData.get('nombre');
    const descripcion = formData.get('descripcion');
    const precio = formData.get('precio');
    const file = formData.get('file')
    const imagen = await imgCreate(file)

    const query = 'insert into articulos(nombre,descripcion,precio,imagen) values (?, ?, ?, ?)';
    const results = await db.query(query, [nombre, descripcion, precio, imagen]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}


export async function editArticulo(formData) {
  const id = formData.get('id')
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = formData.get('precio')
  const file = formData.get('file')
  const imagen = await imgCreate(file)

  try {
    const query = 'update articulos set ? where id = ? ';
    const results = await db.query(query, [{ nombre, descripcion, precio, imagen }, id]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}

export async function deleteArticulo(formData) {
  try {
    const id = formData.get('id');

    const query = 'delete from articulos where id = ?';
    const results = await db.query(query, [id]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}
