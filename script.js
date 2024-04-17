
//e --> enter
//o --> ober
//i --> imes
//a --> ai
//u --> ufat

const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copiar = document.querySelector("copiar");
const iconoPegar = document.getElementById("Pegar");

const contieneModal = document.getElementById("ventanaModal");
const cierraModal = document.getElementsByClassName("btnCerrar")[0];
const input = document.querySelector(".usuario");

var textoArea = "/Bienvenido/ingrese/su/texto>_";


// evento escucha, valida si el input del modal esta vacio y cambia de color si no hay nada en el input y no cierra el modal.
 cierraModal.addEventListener("click", function(){
    if(input.value.length == 0){
      input.style.border = "1px solid red";
      cierraModal.style.border = "2px solid red";
    }else{
      contieneModal.style.display = "none";
      animacionMaquinaEscribir(input.value + textoArea, textArea);
      textArea.value = "";
       
    }
 });
 
    // textArea.addEventListener("input", function(){
    //     if(textArea.value === input.value + textoArea && textArea.value.length === (input.value + textoArea).length){
    //         textArea.value = "";
    //     }
    // })


   textArea.addEventListener("click", function(){
    if(textArea.value === input.value + textoArea){
       textArea.value = "";
    }
   });
  

// funcion del boton para encriptar que llama a la funcion encriptar 
function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value)
    mensaje.value = "" , animacionMaquinaEscribir(textoEncriptado, document.getElementById("mensajeEncriptado"));
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    document.getElementById("copiar").style.display = "block"
}

// funcion para encriptar el texto 
function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase()

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada
}

// funcion del boton de desencriptar que llama a la funcion desencriptar 
function btnDesencriptar() {
    const textoEncriptado = desencriptar(textArea.value)
    mensaje.value = "" , animacionMaquinaEscribir(textoEncriptado, document.getElementById("mensajeEncriptado"))
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    
    
}

// funcion para desencriptar el texto 
function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase()

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada
}


// funcion del boton copiar que copia el texto encriptado 
function btnCopiar() {
   const copyText = document.getElementById("mensajeEncriptado");
   copyText.select();
   navigator.clipboard.writeText(copyText.value);
   alert("copiado")
   const textCopiado = mensaje.value
   textArea.value = "";
   mensaje.value = ""
   
}

iconoPegar.addEventListener('click', () => {
     navigator.clipboard.readText().then((clipText) => {
        textArea.value += clipText;

     });
    
});

// variable para el mensaje que contiene el area donde aparecera el mensaje encriptado 
var mensajeEncriptado = "Texto encriptado aqui...";


// tiempo de espera para ejecutar la anicacion  1000 milisegundos 
var tiempoEspera = 1000;


// funcion para  que el texto encriptado o desencriptado vaya apareciendo con la animacion maquina de escribir
function animacionMaquinaEscribir(texto, elemento){
    var i = 0;
    var intervalo = setInterval(function() {
        if(i < texto.length){
            elemento.value += texto.charAt(i);
            i++;
        }else{
            clearInterval(intervalo);
        }
    }, 100);
}

// espera un tiempo antes de iniciar la animacion
setTimeout (function() {
    var mensaje = document.getElementById("mensajeEncriptado");
    animacionMaquinaEscribir(mensajeEncriptado, mensaje);
}, tiempoEspera);
