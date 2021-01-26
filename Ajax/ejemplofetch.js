let lista = document.getElementById("lista-usuarios");
let Boton = document.getElementById("Boton");
let Nombre= document.getElementById("nombre");
let Apellido=  document.getElementById("apellido")
let Pais=  document.getElementById("pais")
let Usuarios=[]

refrescar();

function render(){
    const usuariosRender= Usuarios.map(usuario=> `<tr> <td> ${usuario.nombre} </td>  </tr>`).join("");
    console.log(usuariosRender);
    lista.innerHTML= usuariosRender;
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
