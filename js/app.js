// variables
const carrito      = document.querySelector('#carrito');
const listaCursos  = document.querySelector('#lista-cursos');

// cada curso que se agrega, aparece en la parte superior derecho icono de carrito.
// es una tabla
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// Limpiar todos los elementos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

// Array para ir almacenando al carrito, conforme vamos dando agregar al carrito
let articulosCarrito = [];
// Tendremos varios Listener, mejor dejarlos en una función 
// para dejarlo más estructurado
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



    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        console.log('vaciar carrito');
        limpiarHTML(); //Eliminar todo el HTML
    })
}

// Funciones
// Prevenir event Bubbling
function agregarCurso(e) {
    // al presionar el botón agregar al carrito, la página se devuelve al comienzo. 
    // Sucede porque es un enlace y intenta ir a un lugar del documento. Como no tiene se va hacia arriba href="#".
    e.preventDefault();
    console.log('presionando en cursos');
    // target es para saber donde damos click
    // classList para ver las clases al hacer click
    // solo funcione cuando presione el boton agregar-carrito
    //2-  contains: verificar si el elemento que se presiono contiene agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        console.log('agregando al carrito');
        console.log(e.target);
        // llegamos al padre del padre de botón agregar-carrito. esto se realiza para meter la información
        console.log(e.target.parentElement.parentElement);
        //3- accedemos a todo el div
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // llamar a la funcion leerDatosCurso
        leerDatosCurso(cursoSeleccionado);
    }
    console.log(e.target.classList);
}

//  Elimina un curso del carrito
function eliminarCurso(e) {
    
    console.log('desde eliminarCurso');//Verificar que el llamado a la funcion esta operativo
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);
        console.log(articulosCarrito);
    }
    carritoHTML();
}



//4- Leer los datos del Curso
// Lee el contenido del HTML al que le dimo click y extrae la info del curso
// para hacerlo se debe subir al padre hasta llegar a .card
function leerDatosCurso(curso) {
    console.log(curso); //Todo el contenido de un solo curso
    //5- Crear un objeto con el contenido del curso actual
    const infoCurso = {
        // .outerHTML src
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

     console.log(infoCurso);// muestra el objeto

    // Revisa si un elemento ya existe en el carrito
    // infoCurso tratar de agregar
    // curso.id los que ya estan en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    console.log(existe);
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                 curso.cantidad++;
                 return curso;// retorna el objeto actualizado
            }else {
                return curso;//retorna los objetos que no son los duplicados
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        // agregamos el cusro al carrito
        articulosCarrito =[...articulosCarrito, infoCurso];
        console.log(articulosCarrito);
    }


    //6- Agregar objeto al arreglo de carrito
    // usando spread operator
    // tomar copia ...articulosCarrito. se debe copiar el arreglo previo para no perder las referencias  
    // articulosCarrito =[...articulosCarrito, infoCurso];
    // console.log(articulosCarrito);

    // mandar a llamar a carritoHTML, despues de leer los datos del curso
    // y haberlos agregado al carrito
    carritoHTML();
}

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


// Elimina los curso del tbody
function limpiarHTML() {
    // Forma lento para eliminar el HTML
    // contenedorCarrito.innerHTML = '';

    // forma rapida
    // tiene al menos un elemento, el código se sigue ejecutando.
    // mientras tbody tenga hijo la condición se cumple
    while (contenedorCarrito.firstChild) {
        // eliminar por referencia. del padre hacía al hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
