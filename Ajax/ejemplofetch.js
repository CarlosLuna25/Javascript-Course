let lista = document.getElementById("lista-usuarios");
let Boton = document.getElementById("Boton");
let Limpiar  = document.getElementById("limpiar");
let Nombre = document.getElementById("nombre");
let Apellido = document.getElementById("apellido");
let Pais = document.getElementById("pais");
let Index = document.getElementById("index"); //indice por si se quiere editar un usuario
let Usuarios = [];
let BotonesEliminar = [];
let BotonesEditar = [];

refrescar();

function render() {
  const usuariosRender = Usuarios.map(
    (usuario, index) => `<tr> <td> ${
      usuario.nombre ? usuario.nombre : "Vacio"
    } </td>
    <td> ${usuario.apellido ? usuario.apellido : "Vacio"} </td>
    <td> ${usuario.pais ? usuario.pais : "Vacio"} </td>
    <td><button class="eliminar" data-index=${index}> Eliminar</button> <button class="editar" data-index=${index}> Editar</button></td>
    </tr>`
  ).join("");
  console.log(usuariosRender);

  lista.innerHTML = usuariosRender;
  BotonesEliminar = document.getElementsByClassName("eliminar");
  Array.from(BotonesEliminar).forEach((botonEliminar) => {
    botonEliminar.onclick = EliminarUsuario;
  });

  BotonesEditar = document.getElementsByClassName("editar");
  Array.from(BotonesEditar).forEach((botonEditar) => {
    botonEditar.onclick = EditarUsuario;
  });
}

function EliminarUsuario(e) {
  e.preventDefault();

  console.log("eliminar usuario", e.target.dataset.index);
  fetch(
    `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.index}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((respuestaJSON) => {
      console.log("Response", respuestaJSON);
    });
  setTimeout(refrescar, 3000);
}

function EditarUsuario(e) {
  e.preventDefault();
  console.log("editar usuario", e.target.dataset.index);
  if (e.target.dataset.index) {
     const user = Usuarios[e.target.dataset.index];
     console.log("user to edit: ", user);
     Nombre.value = user.nombre ? user.nombre : "";
     Apellido.value = user.apellido ? user.apellido : "";
     Pais.value = user.pais ? user.pais : "seleccione";
     Index.value = e.target.dataset.index;
     Boton.innerText="Editar"
  }

 
}
function EnviarDatos(e) {
  e.preventDefault();
  let accion= e.target.innerText;
  let url=null;
  let method=null
  if (accion === "Crear") {
    url="https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios";
    method= "POST"
  }else if (accion==="Editar") {
    if( Index.value ){
      url=`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${Index.value}`;
      method="PUT"
    } else{
      return;
    }
  }else{
    return;
  }
  
  const data = {
    nombre: Nombre.value,
    apellido: Apellido.value,
    pais: Pais.value,
  };

  fetch(
    url,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    } /**Fin de llave de info */
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("success:", data);
      TextoReset();
      
    })
    .catch((e) => {
      console.log(e)
      TextoReset();
    
    });

  setTimeout(refrescar, 5000);
}

function refrescar() {
  fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then((response) => {
      return response.json();
    })
    .then((resUsers) => {
      console.log("ResponseGET", resUsers);
      Usuarios = resUsers;
     
      render();
    }).catch((razon)=>{
      console.log(razon)
      
    });
}
function TextoReset(){
  Boton.innerText="Crear";
  Nombre.value=""
  Apellido.value="";
  Pais.value=""
  Index.value="";
}

Limpiar.onclick= TextoReset;
Boton.onclick = EnviarDatos;


/*  const data = {
    nombre: Nombre.value,
    apellido: Apellido.value,
    pais: Pais.value,
  };


  fetch(
    `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.index}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((respuestaJSON) => {
      console.log("Response", respuestaJSON);
    });  */ 