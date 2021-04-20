const container: HTMLElement | any = document.getElementById("app");
const animals: number = 100;

interface Animal {
    id: number;
    name: string;
    image: string;
    type: string
};

// fetchData allows to loop through the number of animals to retrieve
// and for each object call getAnimals with the animal number
const fetchData = (): void => {
    for (let i = 1; i <= animals; i++){
        getAnimals(i);
    }
}

/* create a new object transformedAnimals
* that mirrors the interface Animal,
* and then pass it as an argument to showAnimals() */
const getAnimals = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const animal: any = await data.json()
    const animalType: string = animal.types
      .map((ani: any) => ani.type.name)
      .join(", ")
  
    const transformedAnimals = {
      id: animal.id,
      name: animal.name,
      image: `${animal.sprites.front_default}`,
      type: animalType,
    }
  
    showAnimals(transformedAnimals)
  }
  

/* receives as a parameter the animals object of type Animal
and returns void or no value to be precise */
const showAnimals = (animals: Animal): void => {
    let output: string = `
    <div class="card">
        <span class="card--id">#${animals.id}</span>
        <img class="card--image" src=${animals.image} alt=${animals.name} />
        <h1 class="card--name">${animals.name}</h1>
        <span class="card--details">${animals.type}</span>
    </div>
`
container.innerHTML +=output;
}

fetchData();