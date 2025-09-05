// JS para asignar la imagen según el atributo
document.querySelectorAll(".catalogo-item").forEach(item => {
  let img = item.getAttribute("data-img");
  item.style.backgroundImage = `url(${img})`;
});
