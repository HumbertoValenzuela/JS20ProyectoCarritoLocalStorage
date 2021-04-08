# JS20ProyectoCarritoLocalStorage
JS 20 Proyecto Carrito Local Storage
* Añadir Local Storage al Carrito de Compras

```javascript
cargarEventListeners()
function cargarEventListeners() {
    //1- Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    // Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })
    
    //7- Muestra el carrito de compras en el HTML
function carritoHTML() {
    
    //8- Limpiar el HTML
    limpiarHTML();
    //9- Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        // muestra el objeto
        console.log(curso);
        // destructuring de objetos, extrae valor y crea la variable
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> x </td>
        `;
        // tiene que ser en el foreach porque puede que tengamos uno o dos
        // elementos en el carrito y queremos ir agregando todos
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
        // notar que al ir agregando y mostrando. el tbody se irá llenando pero no borra los row anteriores.
        // ¿como lo borramos?
    });
    // Agregar el carrito de compras al Storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
```
