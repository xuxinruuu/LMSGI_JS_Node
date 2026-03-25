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
 


//ACT 1

app.post("/ToXML", (req, res) => {
  const { data } = req.body;
    let textRebut = data;
    textRebut = textRebut.replaceAll("{", "");
    textRebut = textRebut.replaceAll("}", "");
    textRebut = textRebut.replaceAll("\"", "");
    let keyvalues = [];
    keyvalues = textRebut.split(",");
    let xml = "";
    xml += "<alumne>\n";
    for (let i = 0; i < keyvalues.length; i++) {
        let kv = keyvalues[i].split(":");
        let key = kv[0];
        let value = kv[1];
        xml += "<" + key + ">";
        xml += value;
        xml += "</" + key + ">\n";
    }
    xml += "</alumne>";
  const result = xml; 
  res.json({ result });
});

app.post("/ToJSON", (req, res) => {
  const { data } = req.body;
  let xml = data;
  xml = xml.replaceAll("/", "");
  let menor = [];
  let major = [];
  for (let i = 0; i < xml.length; i++) {
      if (xml[i] == "<") {
          menor.push(i);
      }
      if (xml[i] == ">") {
          major.push(i);
      }
  }
  let json = "{";
  for (let i = 1; i < menor.length - 1; i++) {
      let key = "";
      let value = "";
      key = xml.substring(menor[i] + 1, major[i]);
      value = xml.substring(major[i] + 1, menor[i + 1]);
      
      json += "\"" + key + "\":" + "\"" + value + "\"";
      if (i < menor.length - 2) {
          json += ",";
      }
  }
  json += "}";
const result = json; 
  res.json({ result });
});



//ACT 2

app.post("/ToJSON2", (req, res) => {
  const { data } = req.body;
  const result = convert.xml2json(data, {compact: true, spaces: 4});
  res.json({ result });
});

app.post("/ToXML2", (req, res) => {
  const { data } = req.body;
  const result = convert.json2xml(data, {compact: true, spaces: 4});
  res.json({ result });
});



//ACT 3
app.post("/PokemonXML", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonData = await response.json();
  // ja tenim el json i podem treballar amb ell 
  const result = convert.js2xml(pokemonData, {compact: true, spaces: 4});
  res.json({ result });
});

app.post("/getPokeJson", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = await response.json();
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});
