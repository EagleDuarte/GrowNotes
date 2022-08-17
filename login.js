document.getElementById("btn-entrar").addEventListener("click", entrar);

document.getElementById("btn-cadastro").addEventListener("click", realizarCadastro);

let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

function entrar() {
  if (!email.value || !senha.value) {
    alert("Os campos não foram preenchidos!");
    return;
  }

  const usuario = listaDeUsuarios.find(
    (usuario) => usuario.email === email.value && usuario.senha === senha.value
  );

  if (!usuario) {
    alert("Usuario invalido ou inexistente");
    return;
  }

  abrirListaDeRecados();
}

function abrirListaDeRecados() {
  window.location.href = "notes.html";
}

function realizarCadastro() {
  window.location.href = "cadastro.html";
  document.getElementById("btn-entrar").addEventListener("click", entrar);

  document
    .getElementById("btn-cadastro")
    .addEventListener("click", realizarCadastro);
  
  let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  
  function entrar() {
    if (!email.value || !senha.value) {
      alert("Os campos não foram preenchidos!");
      return;
    }
  
    const usuario = listaDeUsuarios.find(
      (usuario) => usuario.email === email.value && usuario.senha === senha.value
    );
  
    if (!usuario) {
      alert("Usuario inválido ou inexistente!");
      return;
    }
  
    abrirListaDeRecados();
  }
  
  function abrirListaDeRecados() {
    window.location.href = "notes.html";
  }
  
  function realizarCadastro() {
    window.location.href = "cadastro.html";
  }
}