const mipromesa= new Promise((resolve,reject)=>{
const timeResolved = Math.floor(Math.random()*10000)+1000;
const timeRejected = Math.floor(Math.random()*10000)+1000;


setTimeout( ()=>{
    reject("La promesa Fallo");
}, timeRejected )
setTimeout( ()=>{
    resolve("La promesa se cumplio correctamente");
}, timeResolved )
});

                //si se cumple la promesa
mipromesa.then( (response)=>console.log(response), 
                //si se rechaza
                (reason)=>console.log(reason)
);