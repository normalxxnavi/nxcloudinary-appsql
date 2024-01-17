'use client'
// Drag and Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop


// img: Drag over
export function dragOverHandler(ev) {
    ev.preventDefault();
}

// img: Drop
export function dropHandler(ev) {
    ev.preventDefault();
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;

    fileInput.files = ev.dataTransfer.files;  // IMPORTANTE: Copia imagen al input type='file'

    // si el primer archivo es de tipo image
    if (fileInput.files[0].type.split('/').slice(0,1).join() === 'image') {
        let reader = new FileReader()
        reader.readAsDataURL(fileInput.files[0])  
        reader.onloadend = () => imgPreview.src = reader.result
    }
}


// img: Double click
export function dblclickHandler(ev) {
    const fileInput = ev.target.nextSibling;

    fileInput.click();
}


// input: Change
export function changeHandler(ev) {
    const imgPreview = ev.target.previousSibling;
    const fileInput = ev.target;

    if (fileInput.files && fileInput.files[0]) {

        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);   // elegimos únicamente el primer archivo
        reader.onload = (e) => imgPreview.setAttribute("src", e.target.result);

    }
}