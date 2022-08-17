document.getElementById("btn-criar").addEventListener("click", validarUsuario);

let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

let email = document.getElementById("email");
let senha = document.getElementById("senha");
let senha2 = document.getElementById("senha2");

function salvarUsuario() {
  const usuario = {
    email: email.value,
    senha: senha.value,
  };

  listaDeUsuarios.push(usuario);

  salvarListaUsuariosNoCache();
}

function redirecionarUsuario() {
  window.location.href = "login.html";
}

function salvarListaUsuariosNoCache() {
  const novosUsuarios = JSON.stringify(listaDeUsuarios);

  localStorage.setItem("usuarios", novosUsuarios);

  redirecionarUsuario();
}

function validarUsuario() {
  if (!email.value || !senha.value) {
    alert("Campos Vazios!");
    return;
  }

  if (senha.value !== senha2.value) {
    alert("As senhas não são iguais, tente novamente!");
    return;
  }

  verificarUsuario();

  salvarUsuario();
}

function verificarUsuario() {
  const resultado = listaDeUsuarios.find(
    (usuario) => usuario.email == email.value
  );

  if (resultado) {
    alert("Usuário ja existente!");
  }
}
