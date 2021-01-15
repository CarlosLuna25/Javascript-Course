let lista= document.getElementById("lista-usuarios");
let Boton= document.getElementById("Boton");
function reqListener(){
let usuarios= JSON.parse(this.responseText);
console.log(usuarios)
let render = usuarios.map(usuario => `<li> ${usuario.nombre} </li>` ).join(""); //para unir los elementos li sin el separador ,
lista.innerHTML= render;
   

}



const ajax= new XMLHttpRequest();
ajax.addEventListener("load",reqListener);
refrescar();

function EnviarDatos(){
 ajax.open("POST","https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
 ajax.setRequestHeader("Content-type",
 "application/x-www-form-urlencoded");
 ajax.send("nombre=viernes15");
 setTimeout(refrescar, 5000);
}

function refrescar(){
    ajax.open("GET","https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios",true);
ajax.send();

}

Boton.onclick= EnviarDatos
