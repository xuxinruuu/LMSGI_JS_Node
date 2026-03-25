//EX 
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convert", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});


// ACT 1.2
const btnXML = document.getElementById("btnXML");
const btnJSON = document.getElementById("btnJSON");


btnXML.addEventListener("click", async () => {
  const text = document.getElementById("input1").value;
  const res = await fetch("/convertXML", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output1").value = json.result;
});

btnJSON.addEventListener("click", async () => {
  const text = document.getElementById("input1").value;
  const res = await fetch("/convertJSON", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output1").value = json.result;
});





// ACT 2
const btnXML2 = document.getElementById("btnXML2");
const btnJSON2 = document.getElementById("btnJSON2");


btnXML2.addEventListener("click", async () => {
  const text = document.getElementById("input2").value;
  const res = await fetch("/convertXML2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output2").value = json.result;
});

btnJSON2.addEventListener("click", async () => {
  const text = document.getElementById("input2").value;
  const res = await fetch("/convertJSON2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output2").value = json.result;
});





// ACT 3
const btn_pokemon = document.getElementById("btn_pokemon");
const btn_habilitats = document.getElementById("btn_habilitats");
const btn_foto = document.getElementById("btn_foto");


btn_pokemon.addEventListener("click", async () => {
  const name = document.getElementById("input_pokemon").value.toLowerCase();
  const res = await fetch("/PokemonXML", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  document.getElementById("output_pokemon").value = json.result;
});


btn_habilitats.addEventListener("click", async () => {
  const name = document.getElementById("input_pokemon").value.toLowerCase();
  const res = await fetch("/PokemonJSON", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  const pokemon = json.result;
  const habilitat = pokemon.habilities.map(a => a.hability.name).join(", ");
  document.getElementById("output_pokemon").value = "Habilitats de " + name + ": " + habilitat;
});


btn_foto.addEventListener("click", async () => {
  const name = document.getElementById("input_pokemon").value.toLowerCase();
  const res = await fetch("/PokemonJSON", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  document.getElementById("output_pokemon").value = JSON.stringify(json.result);
   
  let image = document.createElement("img");
  image.src = json.result.sprites.front_shiny;
  document.body.appendChild(image);
});
