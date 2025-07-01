const socket = io();

socket.on('productosActualizados', products => {

  const lista = document.getElementById('lista-productos');

  lista.innerHTML = '';

  products.forEach(p => {
    lista.innerHTML += `<li>${p.title} - $${p.price}</li>`;
  });
});