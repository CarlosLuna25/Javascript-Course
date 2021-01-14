
//es la pila de llamadas dentro de un script, utilizada normalmente para hacer debug de la ejecucion de los scripts,
//Herramientas de desarrollador->sources-> colocar breakpoints del script;
const obtenerNombre=()=> "Carlos" //Arrows functions

const obtenerApellido=()=> "Luna" 


const NombreCompleto=()=>{
    let nombre= obtenerNombre();
    let apellido= obtenerApellido();
    return  `${nombre} ${apellido}`;
}

const nombreCompleto= NombreCompleto();
console.log("Welcome "+nombreCompleto);
