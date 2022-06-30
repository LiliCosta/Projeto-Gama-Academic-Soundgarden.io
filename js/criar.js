// CRIAR UM EVENTO

async function criaEvento(inputs) {
  const evento = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events',
    {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'content-type': 'application/json'
      }
    }
  ).catch(err => console.log(err))
}

document
  .querySelector('#formulario')
  .addEventListener('submit',async function (evento) {
    evento.preventDefault()
    const inputs = {}

    inputs.name = document.querySelector('#nome').value
    inputs.poster = document.querySelector('#poster').value
    inputs.attractions = document.querySelector('#atracoes').value.split(',')
    inputs.description = document.querySelector('#descricao').value
    inputs.scheduled = document.querySelector('#data').value
    inputs.number_tickets = document.querySelector('#lotacao').value

    await criaEvento(inputs)

    window.location.href = "admin.html";
  })
