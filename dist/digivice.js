//URL de la API
const URL2 = 'https://digimon-api.vercel.app/api/digimon';

//Variables on guardem els elements HTML segons l'Id
const searchInput = document.getElementById("search"); //Sugerencia del IDE ja que era necesari
const characterContainer = document.getElementById("character-container");
const searchButton = document.getElementById("search-button");
const suggestionsContainer = document.getElementById("suggestions-container");

//Declarem un array de Strings buit per a emmagatzemar els noms dels personatges més tard
let allCharacterNames = [];

//Funció assíncrona per a recollir dades de la API
async function fetchData() {
  try {
    const response = await fetch(URL2); //Variable per a recollir la resposta de la api amb fetch()
    const data = await response.json(); //Transformem la resposta en un .json i ho guardem a una variable
    const characters = data; //Guardem els resultats del .json en una variable
    allCharacterNames = characters.map(character => character.name); //Apliquem la funció .map per a recollir nomes els noms
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchData();

//Funció per a mostrar sugerencies segons l'entrada de l'usuari
function showSuggestions() {
  const query = searchInput.value.toLowerCase(); //Variable per a guardar el valor d'entrada en minuscules
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Netejar el contenidor de sugerencies
  }
  if (query.length > 0) {
    const filteredNames = allCharacterNames.filter(name => name.toLowerCase().startsWith(query)); //Filtrem els noms segons la combinació de lletres introduida per l'usuari
    filteredNames.forEach(name => {
      const suggestionItem = document.createElement('div'); //Fem un div per a cada name trobat amb filteredNames
      suggestionItem.textContent = name.charAt(0).toUpperCase() + name.slice(1); //Pasem la 1ra lletra del textContent a majuscules i ho juntem amb la resta menys la 1ra lletra
      suggestionItem.classList.add('suggestion-item'); //Afegim la clase suggestion-item al div
      suggestionItem.addEventListener('click', () => { //Listener per a cambiar el valor del searchInput si donem click a una sugerencia
        searchInput.value = name.charAt(0).toUpperCase() + name.slice(1);
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = ''; // Netejar el contenidor de sugerencies
        }
        searchCharacter(); //Cridem la funció de searchCharacter() una vegada cambiat el valor del searchInput
      });
      suggestionsContainer?.appendChild(suggestionItem); //Dins el suggestionContainer afegim cada div com a Child
    });
  }
}

//Funció assíncrona per a buscar el personatge segons el searchInput
async function searchCharacter() {
  const searchedCharacter = searchInput?.value.toLowerCase();
  try {
    const response = await fetch(`${URL2}/name/${searchedCharacter}`); //Guardem la resposta de la API en una variable, utilitzem la variable searchedCharacter per a evitar errors per mayus o minus (o per si es null)
    const data = await response.json(); //Guardem la resposta en format .json
    const characterData = data[0]; //Pasem les dades a la interface Digimon
    let characterName = characterData.name.charAt(0).toUpperCase() + characterData.name.slice(1); //Cambiem la 1ra lletra a majuscula
    if (characterContainer) {
      characterContainer.innerHTML = //Editem el innerHTML del character Container per a mostrar les dades
      `
        <h3 id="character-name">${characterName}</h3>
        <img id="character-img" src="${characterData.img}" alt="${characterData.name}">
        <p id="character-level">Level: ${characterData.level}</p>
      `;
    } else {
      console.error('Character Container is null');
    }
  } catch (error) {
    console.error(error);
  }
}

//Listener per a trucar a la funció searchCharacter si donem click
searchButton?.addEventListener("click", searchCharacter);

//Listener per a trucar la funció searchCharacter si la tecla presionada es Enter
searchInput?.addEventListener("keypress", e => {
  // Si la tecla presionada es Enter se llama a la función searchCharacter
  if (e.key === "Enter") {
    searchCharacter();
  }
});

//Listener per a cridar la funció showSuggestions si el input de SearchInput varia
searchInput?.addEventListener("input", showSuggestions);
