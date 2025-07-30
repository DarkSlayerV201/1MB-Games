// Variables //

const peso = document.getElementById("peso");
const restriccionEdad = document.getElementById("restriccionEdad");
const nombre = document.getElementById("nombre");
const apodo = document.getElementById("apodo");
const mensaje = document.getElementById("mensaje");
const email = document.getElementById("email");
const plataforma = document.getElementById("plataforma")

let camposValidos = {
    pesoEsValido: 0, 
    restriccionEdadEsValido: 0, 
    nombreEsValido: 0, 
    apodoEsValido: 0, 
    mensajeEsValido: 0, 
    emailEsValido: 0,
    plataformaEsValida: 0
}

let selectoresValidos = {
    reducibleEsValido: 0,
    partibleEsValido: 0
}

// Funciones de inserción de HTML //

function agregarBotonEnviar() {
    let boton = document.createElement("button")
    boton.type = 'submit'
    boton.textContent = 'Enviar'
    boton.id = 'botonAgregado'
    document.getElementById("divBoton").appendChild(boton)
}

function agregarMensajePesoMayorA100() {
    let divPadre = document.createElement("div")
    divPadre.id = 'divAgregado'

    let parrafoMensaje = document.createElement("p")
    parrafoMensaje.textContent = 'En principio, no aceptamos juegos de más de 100MB (eso se puede guardar para el futuro 1GB Games). Sin embargo, si así todo pensas que tu juego cumple con la idea de ser un juego que todos puedan jugarlo, podes detallar un poco por qué pensas que es así'
    divPadre.appendChild(parrafoMensaje)

    let divTextArea = document.createElement("div")
    divTextArea.innerHTML = '<textarea name="message" rows="2" placeholder="Aca tenes solo 200 caracteres" maxlength="200" id="justifiacionPesoMayorA100"></textarea>'
    divPadre.appendChild(divTextArea)

    document.getElementById("form_box").appendChild(divPadre)
}

function agregarMensajeInvalido(contenidoInvalido, idInvalido) {
    let divPadre = document.createElement("div")
    divPadre.id = idInvalido

    let parrafoInvalido = document.createElement("p")
    parrafoInvalido.textContent = contenidoInvalido

    divPadre.appendChild(parrafoInvalido)
    document.getElementById("divErrores").appendChild(divPadre)
}

function crearSelector(labelPadre, idSelector) {
    let selector = document.createElement("select")
    selector.id = idSelector

    let opcionPlaceholder = document.createElement("option")
    opcionPlaceholder.value = 'opcion_placeholder'
    opcionPlaceholder.textContent = 'Elija una opción'
    selector.appendChild(opcionPlaceholder)

    let opcionNoSe = document.createElement("option")
    opcionNoSe.value = 'no_se'
    opcionNoSe.textContent = 'No Sé'
    selector.appendChild(opcionNoSe)

    let opcionSi = document.createElement("option")
    opcionSi.value = 'si'
    opcionSi.textContent = 'Sí'
    selector.appendChild(opcionSi)

    let opcionNo = document.createElement("option")
    opcionNo.value = 'no'
    opcionNo.textContent = 'No'
    selector.appendChild(opcionNo)

    labelPadre.appendChild(selector)
} 

function preguntarPesoReducible() {
    let labelMenorPeso = document.createElement("label")
    labelMenorPeso.id = 'labelAgregado1'
    labelMenorPeso.textContent = 'Se puede hacer que pese menos?'
    crearSelector(labelMenorPeso, "selectorMenorPeso")

    let labelPartirJuego = document.createElement("label")
    labelPartirJuego.textContent = 'Se puede partir el juego en paquetes instalables para reducir espacio?'
    labelPartirJuego.id = 'labelAgregado2'
    crearSelector(labelPartirJuego, "selectorPartirJuego")
    
    document.getElementById("form_box").appendChild(labelMenorPeso)
    document.getElementById("form_box").appendChild(labelPartirJuego)
}

function pedirEdadRecomendada () {
    let labelPadre = document.createElement("label")
    labelPadre.id = "edadRecomendada"
    labelPadre.innerHTML = 'Edad recomendada:<input type="number" name="edadRecomendada" placeholder="1" id="edadRecomendadaNumero" max="100">'
    document.getElementById("form_box").appendChild(labelPadre)
}


// Funciones de eliminación de mensajes de error //

function eliminarMensajesDePeso() {
    try {document.getElementById("botonAgregado").remove()} catch (error) {}
    try {document.getElementById("divAgregado").remove()} catch (error) {}
    try {document.getElementById("labelAgregado1").remove()} catch (error) {}
    try {document.getElementById("labelAgregado2").remove()} catch (error) {}
    try {document.getElementById("selectorMenorPesoInvalido").remove()} catch (error) {}
    try {document.getElementById("selectorPartirJuegoInvalido").remove()} catch (error) {}
    try {document.getElementById("justifiacionPesoMayorA100Invalido").remove()} catch (error) {}
}

function eliminarMensajeUnico(idMensaje) {
    try {document.getElementById(idMensaje).remove()} catch (error) {}
}

function eliminarBotonEnviar() {
    try {document.getElementById("botonAgregado").remove()} catch (error) {}
}


// Funciones de validación //

function validarString(campo, idCampo, claveCampo) {
    let valor = document.getElementById(idCampo)

    valor.addEventListener("keyup", function() {
        eliminarMensajeUnico(idCampo.concat("Invalido"))

        if (valor.value.trim() == "") {
            agregarMensajeInvalido(campo.concat(' no puede quedar vacio'), idCampo.concat("Invalido"))
            camposValidos[claveCampo] = 0
        } else {camposValidos[claveCampo] = 1}
        console.log(campo.concat(' esValido: ').concat(camposValidos[claveCampo]))

        validarCampos()
    })
}

function validarFloat(campo, idCampo, claveCampo) {
    let valor = document.getElementById(idCampo)

    valor.addEventListener("keyup", function() {
        console.log("funcion validarFloat()")
        eliminarMensajeUnico(idCampo.concat("Invalido"))

        if (valor.value <= 0) {
            agregarMensajeInvalido(campo.concat(' no puede ser menor o igual a 0'), idCampo.concat("Invalido"))
            camposValidos[claveCampo] = 0
        } else {camposValidos[claveCampo] = 1}
        console.log(campo.concat(' esValido: ').concat(camposValidos[claveCampo]))

        validarCampos()
    })

}

function validarSelector(campo, idCampo, claveCampo, agregarEvento = false) {
    let valor = document.getElementById(idCampo)

    eliminarMensajeUnico(idCampo.concat("Invalido"))

    
    if (valor.value == "opcion_placeholder") {
        agregarMensajeInvalido(campo.concat(' falta elegir una opción válida'), idCampo.concat("Invalido"))
        camposValidos[claveCampo] = 0
    } else {camposValidos[claveCampo] = 1}
    console.log(campo.concat(' esValido: ').concat(camposValidos[claveCampo]))

    validarCampos()
    

    if (agregarEvento) {
        valor.addEventListener("change", function() {
            validarSelector(campo, idCampo, claveCampo)
        })
    }
}

function validarSelectoresDePeso(campo, idCampo, claveCampo, agregarEvento = false) {
    let valor = document.getElementById(idCampo)

    eliminarMensajeUnico(idCampo.concat("Invalido"))

    
    if (valor.value == "opcion_placeholder") {
        agregarMensajeInvalido(campo.concat(' falta elegir una opción válida'), idCampo.concat("Invalido"))
        selectoresValidos[claveCampo] = 0
    } else {selectoresValidos[claveCampo] = 1}
    console.log(campo.concat(' esValido: ').concat(selectoresValidos[claveCampo]))

    validarMultiplesSelectores()
    validarCampos()
    

    if (agregarEvento) {
        valor.addEventListener("change", function() {
            validarSelectoresDePeso(campo, idCampo, claveCampo)
        })
    }
}

function validarMultiplesSelectores() {
    let selectorEsValido = Object.values(selectoresValidos).reduce((a, b) => a + b, 0)

    if (selectorEsValido == 2) {camposValidos["pesoEsValido"] = 1}
    else {camposValidos["pesoEsValido"] = 0}
}

function validarCampos() { 
    // esValido tiene que ser igual a la suma de los campos para resultar validado
    // Si la validacion de todos los campos es igual a 1, entonces 'esValido' sera igual a 6/

    let esValido = Object.values(camposValidos).reduce((a, b) => a + b, 0)
    console.log ("esValido = " + esValido)

    eliminarMensajeUnico("divAgregadoFinal")
    eliminarBotonEnviar()

    if (esValido == 7) {agregarBotonEnviar()} 
    else {agregarMensajeInvalido('Todos los campos deben estar rellenados', "divAgregadoFinal")}
}


// Eventos //

peso.addEventListener("keyup", function() { //Funciona correctamente
    eliminarMensajesDePeso()

    if (peso.value <= 0) {
        agregarMensajeInvalido('El peso no puede ser menor o igual a 0', "divAgregado")
        camposValidos["pesoEsValido"] = 0
    } else if (peso.value > 0) {

        if (peso.value <= 10) {camposValidos["pesoEsValido"] = 1}
        else if (peso.value > 10 && peso.value <= 100) {
            camposValidos["pesoEsValido"] = 0
            preguntarPesoReducible()
            validarSelectoresDePeso('En peso reducible', "selectorMenorPeso", "reducibleEsValido", true)
            validarSelectoresDePeso('En peso partible', "selectorPartirJuego", "partibleEsValido", true)
        }
        else if (peso.value > 100) {
            camposValidos["pesoEsValido"] = 0
            agregarMensajePesoMayorA100()
            validarString('La justificación', "justifiacionPesoMayorA100", 'pesoEsValido')
        }
        
    } else {console.log("Error: 'peso.value' no se puede validarString")}

    console.log('pesoEsValido: ' + camposValidos["pesoEsValido"])
    validarCampos()
})

restriccionEdad.addEventListener("change", function() { //Funciona correctamente
    eliminarMensajeUnico("edadRecomendada")
    eliminarMensajeUnico("edadRecomendadaNumeroInvalido")
    eliminarMensajeUnico("restriccionEdadInvalido")

    if (restriccionEdad.value == "no") {
        camposValidos["restriccionEdadEsValido"] = 0
        pedirEdadRecomendada()
        validarFloat('Edad recomendada', 'edadRecomendadaNumero', "restriccionEdadEsValido")
    } else {
        camposValidos["restriccionEdadEsValido"] = 0
        eliminarMensajeUnico()
        validarSelector('En restricción de edad', "restriccionEdad", "restriccionEdadEsValido")
    }

    validarCampos()
})

nombre.addEventListener("keyup", function() {  //Funciona correctamente
    eliminarMensajeUnico("divAgregadoNombre")

    if (nombre.value.trim() == "") {
        agregarMensajeInvalido('El nombre no puede quedar vacio', "divAgregadoNombre")
        camposValidos["nombreEsValido"] = 0
    } else {camposValidos["nombreEsValido"] = 1}

    validarCampos()
})

apodo.addEventListener("keyup", function() {  //Funciona correctamente
    eliminarMensajeUnico("divAgregadoApodo")

    if (apodo.value.trim() == "") {
        agregarMensajeInvalido('El apodo no puede quedar vacio', "divAgregadoApodo")
        camposValidos["apodoEsValido"] = 0
    } else {camposValidos["apodoEsValido"] = 1}

    validarCampos()
})

mensaje.addEventListener("keyup", function() {  //Funciona correctamente
    eliminarMensajeUnico("divAgregadoMensaje")

    if (mensaje.value.trim() == "") {
        agregarMensajeInvalido('El mensaje no puede quedar vacio', "divAgregadoMensaje")
        camposValidos["mensajeEsValido"] = 0
    } else {camposValidos["mensajeEsValido"] = 1}

    validarCampos()
})

email.addEventListener("keyup", function() {  //Funciona correctamente
    eliminarMensajeUnico("divAgregadoEmail")

    if (email.value.trim() == "") {
        agregarMensajeInvalido('El email no puede quedar vacio', "divAgregadoEmail")
        camposValidos["emailEsValido"] = 0
    } else {camposValidos["emailEsValido"] = 1}

    validarCampos()
})

plataforma.addEventListener("change", function() { //Funciona correctamente
    eliminarMensajeUnico("divAgregadoPlataforma")

    validarSelector('En plataforma', "plataforma", "plataformaEsValida")
})