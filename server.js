const express = require("express");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple

  res.json({ result });
});


app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});
