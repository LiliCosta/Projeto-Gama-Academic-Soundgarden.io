
async function criarEvento(idEvento) {
  const inputs = {}

  inputs.owner_name = document.querySelector('#nome').value
  inputs.owner_email = document.querySelector('#email').value
  inputs.number_tickets = document.querySelector('#tickets').value
  inputs.event_id = idEvento

  const evento = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/bookings
    `,
    {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'content-type': 'application/json'
      }
    }
  ).catch(err => console.log(err))
}

// LISTAR EVENTOS NA PAGINA INICIAL
async function listarEventos() {
  const response = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events'
  ).catch(err => console.log(err))

  const data = await response.json()

  const corpo = document.querySelector('#corpo-eventos')

  data.forEach(function (evento) {
    corpo.innerHTML += `
    <article class="evento card p-5 m-3">
    <h2>${evento.name} - ${evento.scheduled}</h2>
    <h4>${evento.attractions.join(',')}</h4>
    <p>${evento.description}</p>
    
    <button type="submit" class="btn btn-primary" data-dismiss="modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
      onclick="criarFormulario('${evento._id}')">
      reservar ingresso
    </button>
  </article>
    `
  })
}

listarEventos()

// CRIAR MODAL FORMULARIO
function criarFormulario(eventoId) {
  const corpo = document.querySelector('#corpo')

  corpo.innerHTML = ''

  corpo.innerHTML += `
              <div>
                <label>Nome</label>
                <input type="text" class="form-control" id="nome" aria-describedby="nome"/>
              </div>

              <div>
                <label>Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="email"/>
              </div>

              <div>
                <label>Ticktets</label>
                <input type="number" class="form-control" id="tickets" aria-describedby="ticktes"/>
              </div>
              
              <div class="modal-footer" >
                <button class="btn btn-danger" onclick="criarEvento('${eventoId}')" data-bs-dismiss="modal">Enviar</button>
              </div>
  `
}
