const sumar=(num1,num2)=>(num1+num2);

const restar=(num1,num2)=>(num1-num2);

const multiplicar=(num1,num2)=>(num1*num2);
 
function Ejecutar(num1,num2,funcion){
    return funcion(num1,num2);
}

const boton = document.getElementById("MiBoton");
boton.addEventListener("click",(event)=>{
    console.log(event);
    alert("Diste click")
})