// En este archivo se manejan las validaciones y repreguntas a las respuestas

// Funciones
function crearLabel(htmlInterno) {
    let nuevoLabel = document.createElement("label");
    nuevoLabel.innerHTML = htmlInterno;
    return nuevoLabel;
};

function preguntarSiNo() {
    let nuevoSelect = document.createElement("select");
    nuevoSelect.innerHTML = "<option value='si'>Sí</option><option value='no'>No</option><option value='no_se'>No sé</option>";
    return nuevoSelect;
};

function crearParrafoMensaje(contenidoMensaje, selectorPadre) {
    let nuevoMensaje = document.createElement("p");
    nuevoMensaje.textContent = contenidoMensaje;
    document.getElementById(selectorPadre).appendChild(nuevoMensaje)
}

// Variables
let peso = document.getElementById("peso");
let AchicarPeso = "Se puede hacer que pese menos?".concat(preguntarSiNo());
let PartirJuego = "Se puede partir el juego en paquetes instalables para reducir espacio?".concat(preguntarSiNo());
let labelAchicarPeso = crearLabel(AchicarPeso);
let labelPartirJuego = crearLabel(PartirJuego);
let restriccionEdad = document.getElementById("restriccionEdad");

// Condicionales
if (peso > 10 && peso < 100) {
    document.getElementById("form_box").appendChild(labelAchicarPeso);
    document.getElementById("form_box").appendChild(labelPartirJuego);
} else if (peso > 100 && peso < 1000) {
    let descripcionAEliminar = document.getElementById("mensaje");
    descripcionAEliminar.remove();
    let divContenedor = document.createElement("div");
    divContenedor.innerHTML = "<p>En principio, no aceptamos juegos de más de 100MB (eso se puede guardar para el futuro 1GB Games). Sin embargo, si así todo pensas que tu juego cumple con la idea de ser un juego que todos puedan jugarlo,podes detallar un poco por qué pensas que es así</p><textarea name='message' rows='2' placeholder='Aca tenes solo 200 caracteres' maxlength='200'></textarea>";
    document.getElementById("form_box").appendChild(divContenedor);
} else if (peso > 1000) {
    document.getElementById("mensaje").remove(); //Acá estamos tratando de eliminar un 'textarea' directamente, sin antes asignarle una variable
    let parrafoNegativo = "No aceptamos juegos de más de 1GB, eso va en el futuro 1GB Games. Por ahora, acortá el peso"
    crearParrafoMensaje(parrafoNegativo, "form_box")
} else if (peso < 0) {
    document.getElementById("mensaje").remove();
    let parrafoMenorA0 = "No";
    crearParrafoMensaje(parrafoMenorA0, "form_box");
}