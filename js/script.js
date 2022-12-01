const input = document.querySelector("#country-lang");
const button = document.querySelector("#button");
const div = document.querySelector("#country");
button.addEventListener("click", getCountry);

function getCountry(event) {
  div.innerHTML = "";
  event.preventDefault();
  // console.log(input.value);

  const countryLang = input.value.toLowerCase();
  // console.log(countryLang);
  input.value = "";

  fetchRestCountry(countryLang);
}

function fetchRestCountry(countryLang) {
  const url = `https://restcountries.com/v3.1/lang/${countryLang}`;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        throw "Not ok";
      }
    })

    .then(displayCountry)

    .catch((error) => {
      console.log(error);
      const h3 = document.createElement("h3");
      div.appendChild(h3);
      h3.innerText = "Could not find anything, please try again!";
      h3.style.color = "rgb(111, 16, 94)";
    });
}

let biggestPop = 0;
//biggestPop är index
function displayCountry(countryData) {
  for (i = 0; i < countryData.length; i++) {
    console.log(countryData);
    let div2 = document.createElement("div");
    div2.className = "name";
    div.appendChild(div2);

    const img = document.createElement("img");
    img.src = countryData[i].flags.png;
    div2.appendChild(img);

    const h1name = document.createElement("h1");
    h1name.innerText = countryData[i].name.official;
    div2.appendChild(h1name);

    const h4subregion = document.createElement("h4");
    h4subregion.innerText = "Subregion: " + countryData[i].subregion;
    div2.appendChild(h4subregion);

    const h4capital = document.createElement("h4");
    h4capital.innerText = "Capital: " + countryData[i].capital;
    div2.appendChild(h4capital);

    const h4population = document.createElement("h4");
    h4population.innerText = "Population: " + countryData[i].population;
    div2.appendChild(h4population);

    if (countryData[i].population > countryData[biggestPop].population) {
      console.log((biggestPop = i));
    }
  }

  div.getElementsByClassName("name")[biggestPop].style =
    "font-size: x-large; background-color:rgb(111, 16, 94); color: white; border: 2px solid black;";
}