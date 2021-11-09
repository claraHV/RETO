// De ES6:
// 1) se ha usado let en lugar de var
// 2) se han definido las funciones con notación arrow functions
// 3) Se ha usado let en los for

let carrito = [];

function allowDrop(ev) {
  ev.preventDefault();
}


const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
}


const drop = (ev) => {
  ev.preventDefault();
  let idImgSeleccionada = ev.dataTransfer.getData("text");
  let imgSeleccionada = document.getElementById(idImgSeleccionada);
  let precioTexto = imgSeleccionada.parentNode.childNodes[3].childNodes[1].textContent;
  let precioNumero = parseInt(precioTexto);
  let totalTexto = document.getElementById("total").textContent;
  let totalNumero = parseInt(totalTexto) + precioNumero;
  document.getElementById("total").textContent = totalNumero;
  actualizarArrayCarrito(idImgSeleccionada, precioNumero);
  verTablaCarrito();
}


const actualizarArrayCarrito = (id,precio) => {
  encontrado = false;
 
  for (let i in carrito) {
    if (carrito[i].idProducto == id) {
      carrito[i].unidades += 1;
      encontrado = true;
    }
  }
  if (encontrado == false) {
    let nuevo = { idProducto: id, unidades: 1, precioUnidad: precio };
    carrito.push(nuevo);
  }
}


const verTablaCarrito = () => {
  let tabla = document.getElementById("tablaCarrito");
  tabla.innerHTML = "<tr><th>PRODUCTO</th><th>UNIDADES</th><th>PRECIO UNIDAD</th></tr>";

  for (let i in carrito) {

    let fila = document.createElement("tr");
    let celdaId = document.createElement("td");
    let textoCeldaId = document.createTextNode(carrito[i].idProducto);
    let celdaUnidades = document.createElement("td");
    let textoCeldaUnidades = document.createTextNode(carrito[i].unidades);
    let celdaPrecioUnidad = document.createElement("td");
    let textoCeldaPrecioUnidad = document.createTextNode(carrito[i].precioUnidad + "€");
    let celdaBotonEliminar = document.createElement("td");
    celdaBotonEliminar.innerHTML = "<button onclick='eliminar(this)'>Eliminar</button>"

    celdaId.appendChild(textoCeldaId);
    celdaUnidades.appendChild(textoCeldaUnidades);
    celdaPrecioUnidad.appendChild(textoCeldaPrecioUnidad);

    fila.appendChild(celdaId);
    fila.appendChild(celdaUnidades);
    fila.appendChild(celdaPrecioUnidad);
    fila.appendChild(celdaBotonEliminar);

    tabla.appendChild(fila);
  }
}

const eliminar = (boton) => {

  // Primero: borramos los datos del producto en el array carrito

  //Obtenemos el identificador del producto, que es el valor de la primera celda de la tabla
  idProd = boton.parentNode.parentNode.childNodes[0].innerText;

  //Buscamos la posicición del objeto producto en el array
  let posicion = carrito.indexOf(carrito.find(prod => prod.idProducto == idProd));

  //Borramos ese elemento del array
  carrito.splice(posicion, 1);

  //Se resta el precio del producto eliminado
  let uni = parseInt(boton.parentNode.parentNode.childNodes[1].innerText);
  let pre = parseInt(boton.parentNode.parentNode.childNodes[2].innerText);
  let resta = uni*pre;

  let totalTexto = document.getElementById("total").textContent;
  let totalNumero = parseInt(totalTexto) - resta;
  document.getElementById("total").textContent = totalNumero;



  // Segundo: borramos de <table> la fila <tr> en la que está la celda <td> que incluye el <button>

  boton.parentNode.parentNode.remove();

}