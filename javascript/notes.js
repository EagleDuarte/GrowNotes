document.getElementById("sair").addEventListener("click", sair);

document.getElementById("adicionarRecado").addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", salvarRecado);

document
  .querySelector("#tabelaRecados>tbody")
  .addEventListener("click", editDelete);

document.getElementById("cancelar").addEventListener("click", closeModal);

function openModal() {
  return document.getElementById("modal").classList.add("active");
}

function closeModal() {
  clearFields();
  document.getElementById("modal").classList.remove("active");
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("db_usuario") || "[]");
}

function setLocalStorage(dbUsuario) {
  return localStorage.setItem("db_usuario", JSON.stringify(dbUsuario));
}

function deletarRecado(index) {
  const dbUsuario = lerRecado();
  dbUsuario.splice(index, 1);
  setLocalStorage(dbUsuario);
}

function atualizarRecado(index, usuario) {
  const dbUsuario = lerRecado();
  dbUsuario[index] = usuario;
  setLocalStorage(dbUsuario);
}

function lerRecado() {
  return getLocalStorage();
}

function criarRecado(usuario) {
  const dbUsuario = getLocalStorage();
  dbUsuario.push(usuario);
  setLocalStorage(dbUsuario);
}

function isValidFields() {
  return document.getElementById("form").reportValidity();
}

function clearFields() {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("descricao").dataset.index = "new";
}

function salvarRecado() {
  debugger;
  if (isValidFields()) {
    const usuario = {
      descricao: document.getElementById("descricao").value,
      detalhamento: document.getElementById("detalhamento").value,
    };
    const index = document.getElementById("descricao").dataset.index;
    if (index == "new") {
      criarRecado(usuario);
      atualizarTabela();
      closeModal();
    } else {
      atualizarRecado(index, usuario);
      atualizarTabela();
      closeModal();
    }
  }
}

function createRow(usuario, index) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${usuario.descricao}</td>
        <td>${usuario.detalhamento}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
  document.querySelector("#tabelaRecados>tbody").appendChild(newRow);
}

function clearTable() {
  const rows = document.querySelectorAll("#tabelaRecados>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

function atualizarTabela() {
  const dbUsuario = lerRecado();
  clearTable();
  dbUsuario.forEach(createRow);
}

function fillFields(usuario) {
  document.getElementById("descricao").value = usuario.descricao;
  document.getElementById("detalhamento").value = usuario.detalhamento;
  document.getElementById("descricao").dataset.index = usuario.index;
}

function editarRecado(index) {
  const usuario = lerRecado()[index];
  usuario.index = index;
  fillFields(usuario);
  openModal();
}

function editDelete(event) {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editarRecado(index);
    } else {
      const usuario = lerRecado()[index];
      const response = confirm(
        `Deseja realmente excluir o recado ${usuario.descricao}?`
      );
      if (response) {
        deletarRecado(index);
        atualizarTabela();
      }
    }
  }
}

function sair() {
  localStorage.setItem("usuarioLogado", "");
  window.location.href = "login.html";
}

if (!localStorage.getItem("usuarioLogado")) sair();

atualizarTabela();
