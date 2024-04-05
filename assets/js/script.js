
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sObjetivo = document.querySelector('#m-objetivo')
const sPlano = document.querySelector('#m-plano')
const btnSalvar = document.querySelector('#btnSalvar')

let itens = []
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sEmail.value = itens[index].email
    sObjetivo.value = itens[index].objetivo
    sPlano.value = itens[index].plano
    id = index
  } else {
    sNome.value = ''
    sEmail.value = ''
    sObjetivo.value = ''
    sPlano.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.objetivo}</td>
    <td>${item.plano}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sEmail.value == '' || sObjetivo.value == '' || sPlano.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = sEmail.value
    itens[id].objetivo = sObjetivo.value
    itens[id].plano = sPlano.value
  } else {
    itens.push({'nome': sNome.value, 'email': sEmail.value, 'objetivo': sObjetivo.value, 'plano': sPlano.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))



loadItens()
