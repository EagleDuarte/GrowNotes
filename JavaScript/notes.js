let usuarioON=getItemStorage('UsuarioOn')
if(!usuarioON){
  sair();
}

const btnSair = document.getElementById('sair');
btnSair.addEventListener('click', () => {
  atualizarRecados();
  localStorage.removeItem('UsuarioOn');
  sair();
})

 imprimirRecados()

let detalhamentoInput=document.getElementById('detalhamento')
let descricaoInput=document.getElementById('descricao')
let btnSalvar=document.getElementById('btn1')

btnSalvar.addEventListener('click',criarRecado)

function criarRecado() {
  if ( !detalhamento.value || !descricao.value ){
    alert('ops, preencha todos os campos.')
    return;
  }
  
 const recado = {
  id:idGenerator(),
  detalhamento:detalhamentoInput.value,
  descricao:descricaoInput.value
 }

 usuarioON.recados.push(recado)

 setItemStorage('UsuarioOn',usuarioON)

 imprimirRecados()
 

}
const idGenerator = () => {
  const time = new Date().getTime();
   const id= Math.floor((1 + Math.random()) * time).toString(16).substring(1);
   return id+id
}





function imprimirRecados() {
  
      let tbody = document.getElementById('tbody');
      tbody.innerHTML = '';
    
      for(let i in usuarioON.recados) {
        console.log('foi')
           let tr = tbody.insertRow();
    
           let td_id = tr.insertCell();
           let td_detalhamento = tr.insertCell();
           let td_descricao = tr.insertCell();
           let td_acao = tr.insertCell();

           let indice=Number(i)+1
    
           td_id.innerHTML = indice ;
           td_detalhamento.innerHTML = usuarioON.recados[i].detalhamento;
           td_descricao.innerHTML = usuarioON.recados[i].descricao;
           
    
           td_id.classList.add('center');

           
           let imgEdit = document.createElement('img');
           imgEdit.src = 'caneta.png';
           imgEdit.onclick=()=>editarRecado(usuarioON.recados[i].id);
           let imgDelete = document.createElement('img');
           imgDelete.src = 'prancheta.png';
    imgDelete.onclick=()=> deletarRecado(usuarioON.recados[i].id);
      
           
           td_acao.appendChild(imgEdit)
           td_acao.appendChild(imgDelete)
           
           
          }
        }

function editarRecado (id){
  const editar = 
  document.getElementById()
  
  
  
    console.log( 'editou ',id)
}
function editarRecado(index){
  document.getElementById('detalhamento').value = usuarioON.usuarioON;
  document.getElementById('descricao').value = usuarioON.valor;
  return;

}

function deletarRecado(id){
  const confirmeRecado = confirm('Tem certeza que deseja apagar?')
  if(!confirmeRecado){
    console.log( 'não apagou ',id)
    return;
  }
  const deletarRecados = usuarioON.recados.filter((value) => value.id !== id);
  usuarioON.recados = deletarRecados
  setItemStorage('UsuarioOn',usuarioON)
  imprimirRecados();

  
}
        
        
        function getItemStorage(key){
         return JSON.parse(localStorage.getItem(key))
        }

        function setItemStorage(key,valor){
          localStorage.setItem(key,JSON.stringify(valor))}


function atualizarRecados () {
  const usuarios = getItemStorage('usuarios')
  usuarios.forEach(element => {
    if(element.email === usuarioON.email){
      element.recados = usuarioON.recados;
    }
  });
  setItemStorage('usuarios', usuarios);
}

function sair(){
  window.location.href = "entrar.html";
}