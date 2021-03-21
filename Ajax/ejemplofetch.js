let lista = document.getElementById("lista-usuarios");
let Boton = document.getElementById("Boton");
let Nombre= document.getElementById("nombre");
let Apellido=  document.getElementById("apellido")
let Pais=  document.getElementById("pais")
let Usuarios=[]
let BotonesEliminar=[]

refrescar();

function render(){
    const usuariosRender= Usuarios.map((usuario, index)=> `<tr> <td> ${usuario.nombre ? usuario.nombre : "Vacio"} </td>
    <td> ${usuario.apellido ? usuario.apellido : "Vacio"} </td>
    <td> ${usuario.pais ? usuario.pais : "Vacio"} </td>
    <td><button class="eliminar" data-index=${index}> Eliminar</button></td>
    </tr>`).join("");
    console.log(usuariosRender);

    lista.innerHTML= usuariosRender;
    BotonesEliminar= document.getElementsByClassName('eliminar');
    Array.from(BotonesEliminar).forEach(botonEliminar=>{
      botonEliminar.onclick= EliminarUsuario   })
}

function EliminarUsuario(e){
  e.preventDefault();

  console.log("eliminar usuario", e.target.dataset.index)
  fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.index}`,{
    method:"DELETE",
  }).then((response)=>response.json())
  .then(respuestaJSON=>{
    console.log("Response",respuestaJSON)

    });
    setTimeout(refrescar, 3000)
  
}

function EnviarDatos(e) {
    e.preventDefault();
  const data = {nombre:Nombre.value, apellido: Apellido.value, pais:Pais.value
    };

  fetch(
    "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    } /**Fin de llave de info */
  )
    .then((response) =>{
   
       return response.json()})
    .then(data => {
      console.log("success:", data);
    })
    .catch((e) => console.log(e));

  setTimeout(refrescar, 5000);
}

function refrescar() {
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then((response) =>{
   
        return response.json()})
    .then(resUsers=>{
        console.log('ResponseGET',resUsers);
        Usuarios=resUsers; 
        render();
    });
   
}

Boton.onclick = EnviarDatos;
