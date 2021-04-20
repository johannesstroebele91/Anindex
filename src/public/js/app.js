"use strict";
const container = document.getElementById("app");
const animals = 100;
;
// fetchData allows to loop through the number of animals to retrieve
// and for each object call getAnimals with the animal number
const fetchData = () => {
    for (let i = 1; i <= animals; i++) {
        getAnimals(i);
    }
};
/* create a new object transformedAnimals
* that mirrors the interface Animal,
* and then pass it as an argument to showAnimals() */
const getAnimals = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const animal = await data.json();
    const animalType = animal.types
        .map((ani) => ani.type.name)
        .join(",");
    const transformedAnimals = {
        id: animal.id,
        name: animal.name,
        image: `${animal.sprites.font_default}`,
        type: animalType
    };
    showAnimals(transformedAnimals);
};
/* receives as a parameter the animals object of type Animal
and returns void or no value to be precise */
const showAnimals = (animals) => {
    let output = `
    <div class="card">
        <span class="card--id">#${animals.id}</span>
        <img class="card--image" src=${animals.image} alt=${animals.name} />
        <h1 class="card--name">${animals.name}</h1>
        <span class="card--details">${animals.type}</span>
    </div>
`;
    container.innerHTML += output;
};
fetchData();
