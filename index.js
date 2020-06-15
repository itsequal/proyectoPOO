var inDex = 1;
let libros = 2;
async function getData() {
  const response = await fetch("http://localhost:3000/libro/" + inDex);
  const data = await response.json();
  const {
    id,
    titulo,
    autor,
    paginas,
    fama
  } = data;
  document.getElementById('id').textContent = id;
  document.getElementById('tit').textContent = titulo;
  document.getElementById('aut').textContent = autor;
  document.getElementById('pag').textContent = paginas;
  document.getElementById('fam').textContent = fama;
}

document.getElementById('buttons').addEventListener('click', function(evt) {
  var target = evt.target;
  if (target.id === 'Buscar') {
    var inpu = document.getElementById("Look").value;
    if (inpu > libros) {
      inDex = libros;
    } else {
      inDex = inpu;
    }
    getData();
  } else if (target.id === 'Siguiente') {
    inDex++;
    if (inDex > libros) {
      inDex--;
    }
    getData();
  } else if (target.id === 'Anterior') {
    inDex--;
    if (inDex == 0) {
      inDex = 1;
    }
    getData();
  }
}, false);

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  return false;
}

var form = document.getElementById('my-form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}
document.getElementById('Look').value = "";
getData();


document.getElementById("botonAgregar").addEventListener("click", btnAgregar);

function btnAgregar() {
  let titulo = document.getElementById("tituloProd").value;
  let autor = document.getElementById("autorProd").value;
  let paginas = parseInt(document.getElementById("paginasProd").value);
  let fama = document.getElementById("famaProd").value;
  if (titulo == "" || autor == "" || paginas == "" || fama == "") {
    alert("Faltan datos")
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/libro/", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send("titulo=" + titulo + "&autor=" + autor + "&paginas=" + paginas + "&fama=" + fama);
  }
  libros++;
}

document.getElementById("botonPut").addEventListener("click", btnPut);

function btnPut() {
  console.log("presionado put");
  let id = parseInt(document.getElementById("idProd").value);
  let titulo = document.getElementById("tituloProd").value;
  let autor = document.getElementById("autorProd").value;
  let paginas = parseInt(document.getElementById("paginasProd").value);
  let fama = document.getElementById("famaProd").value;
  if (id == "" || titulo == "" || autor == "" || paginas == "" || fama == "") {
    alert("Faltan datos")
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/libro/" + id, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send("id=" + id + "&titulo=" + titulo + "&autor=" + autor + "&paginas=" + paginas + "&fama=" + fama);
  }
}

document.getElementById("Borrar").addEventListener("click", btnDelete);

function btnDelete() {
  console.log("presionado delete");
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:3000/libro/" + inDex, true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.send("id=" + "" + "&titulo=" + "" + "&autor=" + "" + "&paginas=" + "" + "&fama=" + "");
  libros--;
}
