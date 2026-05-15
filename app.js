let carrito = [];

const productosBase = [

    { id:1, nombre:"Cama Roble Elegance", precio:6000, img:"img/camas/camas1.png" },

    { id:2, nombre:"Base Rústica Funcional", precio:6200, img:"img/camas/camas2.png" },

    { id:3, nombre:"Cama Imperial Tallada", precio:6500, img:"img/camas/camas3.png" },

    { id:4, nombre:"Cama Luna Orgánica", precio:6800, img:"img/camas/camas4.png" },

    { id:5, nombre:"Cama Aura Moderna", precio:7000, img:"img/camas/camas5.png" },



    { id:6, nombre:"Escritorio Executive Glass Pro”", precio:4000, img:"img/escritorios/escritorio1.png" },

    { id:7, nombre:"Escritorio Minimal Wood Line", precio:4200, img:"img/escritorios/escritorio2.png" },

    { id:8, nombre:"Escritorio WorkStation L Pro", precio:4500, img:"img/escritorios/escritorio3.png" },

    { id:9, nombre:"Escritorio Ejecutivo Prestige", precio:4700, img:"img/escritorios/escritorio4.png" },

    { id:10, nombre:"Escritorio Urban Office", precio:5000, img:"img/escritorios/escritorio5.png" },



    { id:11, nombre:"Mesa Verona Mármol", precio:3000, img:"img/mesas/mesas1.png" },

    { id:12, nombre:"Comedor Harmony 6P", precio:3200, img:"img/mesas/mesas2.png" },

    { id:13, nombre:"Mesa Nórdica Cross", precio:3500, img:"img/mesas/mesas3.png" },

    { id:14, nombre:"Mesa Imperial Clásica", precio:3700, img:"img/mesas/mesas4.png" },

    { id:15, nombre:"Mesa Nova Minimal", precio:4000, img:"img/mesas/mesas5.png" },



    { id:16, nombre:"Silla Nordic Comfort", precio:1500, img:"img/sillas/sillas1.png" },

    { id:17, nombre:"Silla Roble Classic", precio:1700, img:"img/sillas/sillas2.png" },

    { id:18, nombre:"Silla Curve Design", precio:1800, img:"img/sillas/sillas3.png" },

    { id:19, nombre:"Silla Natural Soft", precio:2000, img:"img/sillas/sillas4.png" },

    { id:20, nombre:"Sillón Royal Deluxe", precio:2200, img:"img/sillas/sillas5.png" },

    { id:21, nombre:"Sillón Retro Nordic", precio:2900, img:"img/sillas/sillas3.webp" }


];

// 🔁 OBTENER PRODUCTOS (base + admin)
function obtenerProductos(){
  let guardados = JSON.parse(localStorage.getItem("productos"));

  if(!guardados || guardados.length === 0){
    localStorage.setItem("productos", JSON.stringify(productosBase));
    return productosBase;
  }

  return guardados;
}

function registrarAdmin(){

  let admin = {
    nombre: document.getElementById("nuevoAdminNombre").value,
    correo: document.getElementById("nuevoAdminCorreo").value,
    telefono: document.getElementById("nuevoAdminTelefono").value,
    password: document.getElementById("nuevoAdminPassword").value,
    rol: "admin"
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push(admin);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Administrador agregado correctamente ✅");
}

function mostrarClientes(){

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let clientes = usuarios.filter(u => u.rol === "cliente");

  let cont = document.getElementById("listaClientes");

  if(!cont) return;

  cont.innerHTML = "";
clientes.forEach((c, index) => {

  cont.innerHTML += `

    <div class="card">

      <h3>${c.nombre}</h3>

      <p>Correo: ${c.correo}</p>

      <p>Teléfono: ${c.telefono}</p>

      <button
        onclick="eliminarCliente(${index})"
        style="background:red;">
        Dar de baja
      </button>

    </div>

  `;
});
}

function eliminarCliente(index){

  let usuarios = JSON.parse(
    localStorage.getItem("usuarios")
  ) || [];

  let clientes = usuarios.filter(
    u => u.rol === "cliente"
  );

  let clienteEliminar = clientes[index];

  if(confirm("¿Dar de baja este cliente?")){

    usuarios = usuarios.filter(
      u => u.correo !== clienteEliminar.correo
    );

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

    mostrarClientes();

    alert("Cliente eliminado correctamente ✅");
  }
}

// 🔐 LOGIN
function login(){
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let usuario = usuarios.find(u => 
    u.correo === correo.value && u.password === password.value
  );

  if(!usuario){
    alert("Datos incorrectos");
    return;
  }

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  if(usuario.rol === "admin"){
    location.href = "admin.html";
  } else {
    location.href = "catalogo.html";
  }
}

function filtrarCategoria(){

  let cat = document.getElementById("categoria").value;

  let productos = obtenerProductos();

  let filtrados = productos.filter(p =>
    cat === "" || p.categoria === cat
  );

  renderProductos(filtrados);
}

// 📝 REGISTRO
function registrar(){

  let usuario = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    password: document.getElementById("password").value,
    telefono: document.getElementById("telefono").value,
    rol: "cliente" // 👈 SIEMPRE cliente
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso");
  location.href = "login.html";
}

// 🔒 SEGURIDAD
function verificarAdmin(){
  let u = JSON.parse(localStorage.getItem("usuarioActivo"));
  if(!u || u.rol !== "admin"){
    location.href = "login.html";
  }
}

function verificarSesion(){
  let u = JSON.parse(localStorage.getItem("usuarioActivo"));
  if(!u){
    location.href = "login.html";
  }
}

// 🚪 LOGOUT
function logout(){
  localStorage.removeItem("usuarioActivo");
  location.href = "login.html";
}
function cargarProductos(){

  let productos = obtenerProductos();

  renderProductos(productos);



}
function agregarCarrito(p){

  let productos = obtenerProductos();

  let index = productos.findIndex(x => x.id === p.id);

  // controlar stock
  if(productos[index].stock !== null){

    if(productos[index].stock <= 0){

      alert("Sin stock ❌");

      return;
    }

    productos[index].stock--;
  }

  carrito.push(p);

  localStorage.setItem(
    "productos",
    JSON.stringify(productos)
  );

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();

  cargarProductos();

  // MENSAJE
  alert("Agregado exitosamente ✅");

  // CERRAR MODAL
  cerrarModal();
}
function cerrarModal(){

  document.getElementById(
    "modalProducto"
  ).style.display = "none";
}
function eliminarProducto(i){
  carrito.splice(i,1);
  mostrarCarrito();
}
function mostrarCarrito(){

  let lista = document.getElementById("carrito");

  if(!lista) return;

  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((p, i) => {

    total += p.precio;

   lista.innerHTML += `
  <div style="display:flex; justify-content:space-between;">
    <span>${p.nombre} - $${p.precio}</span>
    <button onclick="eliminarProducto(${i})">❌</button>
  </div>
`;
  });

  lista.innerHTML += `<h3>Total: $${total}</h3>`;
}
function buscarProducto(){

  let texto = document
    .getElementById("busqueda")
    .value
    .toLowerCase();

  let productos = obtenerProductos();

  let filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );

  renderProductos(filtrados);

}
function filtrarPorPrecio(){

  let min = parseFloat(
    document.getElementById("precioMin").value
  ) || 0;

  let max = parseFloat(
    document.getElementById("precioMax").value
  ) || Infinity;

  let productos = obtenerProductos();

  let filtrados = productos.filter(p =>
    p.precio >= min && p.precio <= max
  );

  renderProductos(filtrados);
}
// ❌ ELIMINAR DEL CARRITO
function eliminarProducto(index){
  carrito.splice(index, 1);
  mostrarCarrito();
}
function enviarWhatsApp(){

  if(carrito.length === 0){
    alert("No hay productos");
    return;
  }

  let msg = "Hola, quiero cotizar:\n\n";
  let total = 0;

  carrito.forEach(p => {
    msg += `- ${p.nombre} $${p.precio}\n`;
    total += p.precio;
  });

  msg += `\nTotal: $${total}`;

  // 👇 AQUÍ PONES EL NÚMERO DE LA EMPRESA
  let numero = "5214776874221"; 

  let url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;

let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];

let nuevaCotizacion = {
  estado: "Pendiente",
  id: Date.now(),
  cliente: usuario.nombre,
  correo: usuario.correo,
  fecha: new Date().toLocaleString(),
  productos: carrito,
  total: total
};

cotizaciones.push(nuevaCotizacion);

localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

  window.open(url, "_blank");
}
// 🧑‍💼 ADMIN
function mostrarAdmin(){
  let productos = obtenerProductos();
  let cont = document.getElementById("listaAdmin");

  if(!cont) return;

  cont.innerHTML = "";

  productos.forEach((p,i) => {
    cont.innerHTML += `
      <div>
        <img src="${p.img}" width="50">
        ${p.nombre} - $${p.precio} - Stock: ${p.stock}
        <button onclick="eliminarAdmin(${i})">Eliminar</button>
        <button onclick="editarProducto(${i})">Editar</button>
      </div>
    `;
  });
}function agregarProducto(){

  let productos = obtenerProductos();

  let archivo = document.getElementById("imagen").files[0];

  if(!archivo){
    alert("Selecciona una imagen");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e){

    let nuevo = {
      id: Date.now(),
      nombre: document.getElementById("nombre").value,
      precio: parseFloat(document.getElementById("precio").value),
      stock: document.getElementById("stock").value === "" 
              ? null 
              : parseInt(document.getElementById("stock").value),
      img: e.target.result // 👈 imagen en base64
    };

    productos.push(nuevo);

    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("mensaje").innerText = "Agregado exitosamente ✅"; // 👈 AGREGA ESTA LÍNEA
    mostrarAdmin();
  };

  reader.readAsDataURL(archivo);
}

function mostrarCotizaciones(){

  let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];

  let cont = document.getElementById("listaCotizaciones");

  if(!cont) return;

  cont.innerHTML = "";

  cotizaciones.forEach((c, index) => {

  let productosHTML = "";

  c.productos.forEach(p => {

    productosHTML += `
      <li>
        ${p.nombre} - $${p.precio}
      </li>
    `;
  });

  cont.innerHTML += `

    <div class="card">

      <h3>${c.cliente}</h3>

      <p>${c.correo}</p>

      <p>Fecha: ${c.fecha}</p>

      <p>
        <b>Estado:</b>
        ${c.estado}
      </p>

      <ul>
        ${productosHTML}
      </ul>

      <h4>Total: $${c.total}</h4>

      <button onclick="completarCotizacion(${index})">
        Marcar como completada
      </button>

      <button onclick="eliminarCotizacion(${index})"
        style="background:red;">
        Eliminar
      </button>

    </div>
  `;
});
}

function eliminarCotizacion(index){

  let cotizaciones = JSON.parse(
    localStorage.getItem("cotizaciones")
  ) || [];

  if(confirm("¿Eliminar cotización?")){

    cotizaciones.splice(index,1);

    localStorage.setItem(
      "cotizaciones",
      JSON.stringify(cotizaciones)
    );

    mostrarCotizaciones();
  }
}

function completarCotizacion(index){

  let cotizaciones = JSON.parse(
    localStorage.getItem("cotizaciones")
  ) || [];

  cotizaciones[index].estado =
    "Venta completada ✅";

  localStorage.setItem(
    "cotizaciones",
    JSON.stringify(cotizaciones)
  );

  mostrarCotizaciones();

  alert("Cotización completada ✅");
}

function renderProductos(listaProductos){

  let cont = document.getElementById("productos");

  if(!cont) return;

  cont.innerHTML = "";

  listaProductos.forEach(p => {

    cont.innerHTML += `

      <div class="card" onclick="verProducto(${p.id})">

        <img src="${p.img}">

        <h3>${p.nombre}</h3>

        <p>$${p.precio}</p>

      </div>

    `;
  });
}

function verProducto(id){

  let productos = obtenerProductos();

  let p = productos.find(x => x.id === id);

  let cont = document.getElementById("detalleProducto");

  let botonHTML = "";

  if(p.stock !== null && p.stock <= 0){

    botonHTML = `
      <button disabled style="background:red;">
        Sin stock
      </button>
    `;
  }
  else{

    botonHTML = `
      <button onclick='agregarCarrito(${JSON.stringify(p)})'>
        Agregar a cotización
      </button>
    `;
  }

  cont.innerHTML = `

    <img src="${p.img}" style="width:100%; border-radius:10px;">

    <h2>${p.nombre}</h2>

    <p><b>Precio:</b> $${p.precio}</p>

    <p><b>Categoría:</b> ${p.categoria || "General"}</p>

    <p><b>Descripción:</b> ${p.descripcion || "Sin descripción"}</p>

    <p><b>Medidas:</b> ${p.medidas || "No especificadas"}</p>

    <p>
      <b>Disponibles:</b>
      ${p.stock === null ? "Ilimitado" : p.stock}
    </p>

    ${botonHTML}

  `;

  document.getElementById("modalProducto").style.display = "flex";
}


function eliminarAdmin(i){
  let productos = obtenerProductos();

  productos.splice(i,1);

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarAdmin();
}
function editarProducto(i){
  let productos = obtenerProductos();
  let p = productos[i];

  let nuevoNombre = prompt("Nombre", p.nombre);
  let nuevoPrecio = prompt("Precio", p.precio);
  let nuevoStock = prompt("Stock (deja vacío para ilimitado)", p.stock ?? "");

  p.nombre = nuevoNombre;
  p.precio = parseFloat(nuevoPrecio);

  // 👇 lógica para null
  if(nuevoStock === "" || nuevoStock === null){
    p.stock = null; // ilimitado
  } else {
    p.stock = parseInt(nuevoStock);
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarAdmin();
}