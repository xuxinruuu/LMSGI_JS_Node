const express = require("express");
const convert = require("xml-js");

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
 


//endpoint ACT 1.2

app.post("/convertXML", (req, res) => {
  const { data } = req.body;
  const result = convert.xmlToJson(data);
  res.json({ result });
});

app.post("/convertJSON", (req, res) => {
  const { data } = req.body;
  const result = convert.jsonToXml(data);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});


//endpoint ACT 2: 

// xml >> json
app.post("/convertJSON2", (req, res) => {
  const { data } = req.body;
  const result = convert.xml2json(data, {compact: true, spaces: 4});
  res.json({ result });
});

//json >> xml 
app.post("/convertXML2", (req, res) => {
  const { data } = req.body;
  const result = convert.json2xml(data, {compact: true, spaces: 4});
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});



//endpoint ACT 3

app.post("/PokemonXML", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = convert.json2xml(await response.json());
  res.json({ result });
});

app.post("/PokemonJSON", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = await response.json();
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});

