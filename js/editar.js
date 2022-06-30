let urlSearchParams = new URLSearchParams(window.location.search) // pegar os parametros da url
let id = urlSearchParams.get('id')

// CARREGAR
async function carregarForm() {
  const response = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`)
  
  const data = await response.json()


  document.querySelector('#nome').value = data.name;
  document.querySelector('#banner').value = data.poster;
  document.querySelector('#atracoes').value = data.attractions;
  document.querySelector('#descricao').value = data.description;
  document.querySelector('#data').value = data.scheduled;
  document.querySelector('#lotacao').value = data.number_tickets;  
}
carregarForm()

// CRIAR

async function criaEvento(inputs) {
  const evento = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events/${id}`,
    {
      method:'PUT',
      body: JSON.stringify(inputs),
      headers: {
        'content-type': 'application/json'
      }
    }
  ).catch(err => console.log(err))
}

document
  .querySelector('#form')
  .addEventListener('submit', async function (evento) {
    evento.preventDefault()
    const inputs = {}

    inputs.name = document.querySelector('#nome').value
    inputs.poster = document.querySelector('#banner').value
    inputs.attractions = document.querySelector('#atracoes').value.split(',')
    inputs.description = document.querySelector('#descricao').value
    inputs.scheduled = document.querySelector('#data').value
    inputs.number_tickets = document.querySelector('#lotacao').value

    await criaEvento(inputs)

    window.location.href = "admin.html";

  })








