//Consumo de API de perritos, heroku.

const API_url = "https://perritusbonitus.herokuapp.com/Perros";
const container_DATA = document.getElementById('container_DATA');


async function getData (){

try{
    const data = await fetch(API_url) 
    const json = await data.json()
    console.log(json)
    return json
} 

catch (error) {
console.log("error en la data" + error)
}

}

getData()


async function showCards () {

const data = await getData()

container_DATA.innerHTML=''

data.forEach(element => {

const {id, product, imagen} = element

container_DATA.innerHTML +=`

<div class="card" style="width: 18rem;">
        <img src="${imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>

`
    
});

}

showCards()

//Creación del CRUD.

async function addPuppy (){



}