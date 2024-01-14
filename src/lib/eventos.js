'use client'
// Drag and Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
// Drag over on img
export function dragOverHandler(ev) {
    ev.preventDefault();
}

// Drop on img
export function dropHandler(ev) {
    ev.preventDefault();
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;
    // console.dir(ev.target)

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(...ev.dataTransfer.items);
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items are files ...
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileInput.files = ev.dataTransfer.files;  // IMPORTANTE: Copia imagen al input type='file'

                let reader = new FileReader()
                reader.readAsDataURL(fileInput.files[0])
                reader.onloadend = () => imgPreview.src = reader.result
                // reader.onloadend = (e) => imgPreview.setAttribute("src", e.target.result);
            }
        });
    }
}


// Double click on img
export function dblclickHandler(ev) {
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;

    fileInput.click();
}


// Change on input
export function changeHandler(ev) {
    const imgPreview = ev.target.previousSibling;
    const fileInput = ev.target;

    if (fileInput.files && fileInput.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            imgPreview.setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}