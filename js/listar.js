// LISTAR EVENTOS

async function listarEvents() {
  const response = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events'
  ).catch(err => console.log(err))
  const data = await response.json()

  const corpo = document.querySelector('#corpo')

  const htmlEventos = data.map(function (evento, index) {
    let html = `<tr>
    <th scope="row">${index + 1}</th>
    <td>${evento.scheduled}</td>
    <td>${evento.name}</td>
    <td>${evento.attractions.join(',')}</td>
    <td>
        
    <button type="submit" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="listarReservas('${
      evento._id
    }')">ver reservas</button>

    <a href="editar-evento.html?id=${
      evento._id
    }" class="btn btn-secondary"> editar </a>
    <a href="excluir-evento.html?id=${
      evento._id
    }" class="btn btn-danger"> excluir </a>
    </td>
    </tr>`

    return html
  })

  corpo.innerHTML += htmlEventos
}




// MODAL
async function listarReservas(eventoId) {
  const corpo = document.querySelector('#corpo-modal')

  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/bookings/event/${eventoId}`
  ).catch(err => console.log(err))

  const data = await response.json()

  if (data.length === 0) {
    corpo.innerHTML = 'Nenhuma reserva encontrada'
    return
  }

  corpo.innerHTML = ''

  data.forEach(function (booking) {
    corpo.innerHTML += `

    

    <p>Nome: ${booking.owner_name}</p>
    <p>Reservas: ${booking.number_tickets}</p>
    <hr>
  `
  })
}

listarEvents()
