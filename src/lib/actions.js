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
      public_id: file.name.split('.').slice(0, -1).join('.'), // eliminamos extensión del archivo
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
    await new Promise((resolve) => setTimeout(resolve, 2000));


    const results = await db.query('select * from articulos');
    console.log(results);

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function newArticulo(formData) {
  const nombre = formData.get('nombre');
  const descripcion = formData.get('descripcion');
  const precio = formData.get('precio');
  const file = formData.get('file')

  try {
    let results = null;
    let query = null;

    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      const imagen = await imgCreate(file)
      query = 'insert into articulos(nombre,descripcion,precio,imagen) values (?, ?, ?, ?)';
      results = await db.query(query, [nombre, descripcion, precio, imagen]);
    } else {
      query = 'insert into articulos(nombre,descripcion,precio) values (?, ?, ?)';
      results = await db.query(query, [nombre, descripcion, precio]);
    }
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

  try {
    let results = null;
    const query = 'update articulos set ? where id = ? ';

    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      const imagen = await imgCreate(file)
      results = await db.query(query, [{ nombre, descripcion, precio, imagen }, id]);
    } else {
      results = await db.query(query, [{ nombre, descripcion, precio }, id]);
    }
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}

export async function deleteArticulo(formData) {
  const id = formData.get('id');

  try {
    const query = 'delete from articulos where id = ?';
    const results = await db.query(query, [id]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}
