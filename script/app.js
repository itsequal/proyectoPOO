//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

let libros = [{
    "id": 0,
    "titulo": "Null",
    "autor": "Null",
    "paginas": 0,
    "fama": "Null"
  },
  {
    "id": 1,
    "titulo": "Harry Potter",
    "autor": "J.K Rowling",
    "paginas": 1280,
    "fama": "alta"
  },
  {
    "id": 2,
    "titulo": "Los Juegos del Hambre",
    "autor": "Suzanne Collins",
    "paginas": 1190,
    "fama": "alta"
  }
]
var id = libros.length;
var id2 = libros.length - 1;

class article {
  constructor(id, titulo, autor, paginas, fama) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.fama = fama;
  }
}

app.get("/libros", cors(), function(req, res) {
  res.send(libros);
});

app.route("/libro/:id?")
  .get(cors(), function(req, res) {
    res.send(libros[req.params.id]);
  })
  .post(cors(), function(req, res) {
    const newArticle = new article(
      id,
      req.body.titulo,
      req.body.autor,
      req.body.paginas,
      req.body.fama,
    );
    id++;
    libros.push(newArticle);
    res.send("Success");
    id2++;
  })
  .put(cors(), function(req, res) {
    if (req.params.id == libros[req.params.id].id) {
      libros[req.params.id] = new article(
        req.params.id,
        req.body.titulo,
        req.body.autor,
        req.body.paginas,
        req.body.fama,
      );
      res.send("Success");
    } else {
      res.send("ERROR");
    }
  })
  .delete(cors(), function(req, res) {
    if (id2 > 0) {
      if (req.params.id == libros[req.params.id].id) {
        tempor = req.params.id;
        libros.splice(req.params.id, 1);
        res.send("Success");
        while (tempor != libros.length) {
          libros[tempor].id--;
          tempor++;
        };
        id--;
        id2--;
      } else {
        res.send("ERROR");
      }
    } else {
      res.send("ERROR")
    }
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
