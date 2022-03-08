//Consumo de API de perritos, heroku.

const API_url = "https://perritusbonitus.herokuapp.com/Perros";
const container_DATA = document.getElementById('container_DATA');

const $form = document.getElementById("formulario");
const $btnSearch = document.getElementById("btnSearch");

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
        </div>
      </div>

`
    
});

}

showCards()

//Creación del CRUD.

async function addPuppy (){
  const $raza = document.getElementById("raza").value;
  const $imagen = document.getElementById("imagenReferencial").value;

  const resp = await fetch(API_url, {
    method: "POST",
    body: JSON.stringify({
      product: $raza,
      imagen: $imagen,
    }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    }
  })

  console.log(resp);

}

async function searchPuppy() {
  let raza = document.getElementById("raza").value;

  let resp = await fetch(API_url);
  let data = await resp.json();

  let modificar = data.find(puppy => puppy.product.toLocaleLowerCase().includes(raza.toLocaleLowerCase()))
  console.log(modificar);
  printFiles(modificar);
}

function printFiles({id}) {
  let $id = document.getElementById("idDelPerro2");
  $id.style.display = "block";
  $id.value = id;


  return;
}


document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("idDelPerro2").style.display = "none";
})

document.getElementById("btnEdit").addEventListener("click", async () => {
  let $id = document.getElementById("idDelPerro2").value; 
  const $razaM = document.getElementById("raza").value;
  const $imagenM = document.getElementById("imagenReferencial").value;

  const resp = await fetch(`${API_url}/${$id}`, {
    method: "PUT",
    body: JSON.stringify({
      product: $razaM,
      imagen: $imagenM,
    }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  })

  console.log("EDIT ",resp);

})

document.getElementById("btnDelete").addEventListener("click", async () => {
  let $id = document.getElementById("idDelPerro2").value;
  await fetch(`${API_url}/${$id}`,{
    method: "DELETE",
  })

  console.log(`Perro: ${$id} Eliminado`);
})

$form.addEventListener("submit", e  => {
  e.preventDefault();

  addPuppy();
})

$btnSearch.addEventListener("click", searchPuppy);