document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs();
  addSubmitHandler()
})

function fetchAllDogs(){
  fetch(`http://localhost:3000/dogs`)
  .then(response => response.json())
  .then(jsonData => {
    getTable().innerHTML = ''
    jsonData.forEach(dog => render(dog))
  })
}

function render(dog){
  let editButton = document.createElement('button')
  editButton.innerText = 'Edit Dog'
  editButton.id = dog.id
  editButton.addEventListener('click', editDogHandler)
  let tr = document.createElement('tr')
  let nameCell = document.createElement('td')
  nameCell.innerText = dog.name
  let breedCell = document.createElement('td')
  breedCell.innerText = dog.breed
  let genderCell = document.createElement('td')
  genderCell.innerText = dog.gender
  let editCell = document.createElement('td')
  editCell.appendChild(editButton)
  tr.appendChild(nameCell)
  tr.appendChild(breedCell)
  tr.appendChild(genderCell)
  tr.appendChild(editCell)
  getTable().appendChild(tr)
}

function getTable(){
  return document.querySelector('#table-body');
}

function editDogHandler(event){
  fetchDog(event.target.id)
}

function fetchDog(id){
  fetch(`http://localhost:3000/dogs/${id}`)
  .then(response => response.json())
  .then(jsonData => fillForm(jsonData))
}

function fillForm(dog){
  document.getElementsByName('name')[0].value = dog.name
  document.getElementsByName('breed')[0].value = dog.breed
  document.getElementsByName('sex')[0].value = dog.gender
  document.getElementsByTagName('form')[0].id = dog.id
}

function updateDog(id){
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementsByName('name')[0].value,
      breed: document.getElementsByName('breed')[0].value,
      gender: document.getElementsByName('sex')[0].value
    })
  })
  .then(response => response.json())
  .then(jsonData => fetchAllDogs())
}

function addSubmitHandler(){
  document.querySelector("#submit").addEventListener('click', function(e){
    e.preventDefault()
    updateDog(document.getElementsByTagName('form')[0].id)
  })
}
