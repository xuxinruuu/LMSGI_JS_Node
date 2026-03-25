const btn = document.getElementById("btn");
const btnToXML = document.getElementById("btnToXML");
const btnToJSON = document.getElementById("btnToJSON");
const btnToXML2 = document.getElementById("btnToXML2");
const btnToJSON2 = document.getElementById("btnToJSON2");
const btnPokeXML = document.getElementById("btnPokeXML");
const btnPokeHabilitats = document.getElementById("btnPokeHabilitats");
const btnPokeFoto = document.getElementById("btnPokeFoto");



//EX 
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



// ACT 1
btnToXML.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/toXML", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

btnToJSON.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/ToJSON", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});





// ACT 2
btnToXML2.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/ToXML2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

btnToJSON2.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/ToJSON2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});





// ACT 3
btnPokeXML.addEventListener("click", async () => {
  const name = document.getElementById("input").value.toLowerCase();
  const res = await fetch("/PokemonXML", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

btnPokeHabilitats.addEventListener("click", async () => {
  const name = document.getElementById("input").value.toLowerCase();
  const res = await fetch("/getPokeJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  const pokemon = json.result;
  const habs = pokemon.abilities.map(a => a.ability.name).join(", ");
  document.getElementById("output").value = "Habilitats de " + name + ": " + habs;
});

btnPokeFoto.addEventListener("click", async () => {
  const name = document.getElementById("input").value.toLowerCase();
  const res = await fetch("/getPokeJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: name })
  });
  const json = await res.json();
  const pokemon = json.result;
  let img = document.getElementById("pokeImg");
  if (!img) {
    img = document.createElement("img");
    img.id = "pokeImg";
    document.body.appendChild(img);
  }
  img.src = pokemon.sprites.front_default;
});
