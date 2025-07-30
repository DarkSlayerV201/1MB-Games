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
    document.getElementById("form_box").appendChild(divPadre)
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
    labelPadre.innerHTML = 'Edad recomendada:<input type="number" name="edadRecomendada" placeholder="1" id="edadRecomendadaNumero">'
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

function validarSelector(campo, idCampo, claveCampo) {
    let valor = document.getElementById(idCampo)

    eliminarMensajeUnico(idCampo.concat("Invalido"))

    //valor.addEventListener("change", function() {
        if (valor.value == "opcion_placeholder") {
            agregarMensajeInvalido(campo.concat(' falta elegir una opción válida'), idCampo.concat("Invalido"))
            camposValidos[claveCampo] = 0
        } else {camposValidos[claveCampo] = 1}
        console.log(campo.concat(' esValido: ').concat(camposValidos[claveCampo]))

        validarCampos()
    //})
}

function validarCampos() { 
    // esValido tiene que ser igual a la suma de los campos para resultar validado
    // Si la validacion de todos los campos es igual a 1, entonces 'esValido' sera igual a 6/
    let esValido = Object.values(camposValidos).reduce((a, b) => a + b, 0)
    console.log ("esValido = " + esValido)

    eliminarMensajeUnico("divAgregadoFinal")
    eliminarBotonEnviar()

    if (esValido == 7) {agregarBotonEnviar()} else {agregarMensajeInvalido('Todos los campos deben estar rellenados', "divAgregadoFinal")}
}


// Eventos //

peso.addEventListener("keyup", function() {
    eliminarMensajesDePeso()

    if (peso.value <= 0) {
        agregarMensajeInvalido('El peso no puede ser menor o igual a 0', "divAgregado")
        camposValidos["pesoEsValido"] = 0
    } else if (peso.value > 0) {

        if (peso.value <= 10) {camposValidos["pesoEsValido"] = 1}
        else if (peso.value > 10 && peso.value <= 100) {
            preguntarPesoReducible()
            camposValidos["pesoEsValido"] = 0
            validarSelector('En peso reducible', "selectorMenorPeso", "pesoEsValido")
            validarSelector('En peso partible', "selectorPartirJuego", "pesoEsValido")
            //camposValidos["pesoEsValido"] = 1
        }
        else if (peso.value > 100) {
            agregarMensajePesoMayorA100()
            validarString('La justificación', "justifiacionPesoMayorA100", 'pesoEsValido')
        }
        
    } else {console.log("Error: 'peso.value' no se puede validarString")}

    console.log('pesoEsValido: ' + camposValidos["pesoEsValido"])
    validarCampos()
})

restriccionEdad.addEventListener("change", function() {
    eliminarMensajeUnico("edadRecomendada")
    eliminarMensajeUnico("edadRecomendadaNumeroInvalido")

    if (restriccionEdad.value == "no") {
        camposValidos["restriccionEdadEsValido"] = 0
        pedirEdadRecomendada()

        let edadRecomendada = document.getElementById("edadRecomendada")
        edadRecomendada.addEventListener("keyup", function() {
            validarFloat('Edad recomendada', 'edadRecomendadaNumero', "restriccionEdadEsValido")
            //console.log("edadRecomendada fue triggereado")
            //console.log("restriccionEdadEsValido = " + restriccionEdadEsValido)
            validarCampos()
        })
        //validarFloat('Edad recomendada', 'edadRecomendadaNumero', "restriccionEdadEsValido")
        //console.log("edadRecomendada.value" + edadRecomendada.value)
    } else {
        eliminarMensajeUnico()
        validarSelector('en restricción de edad', "restriccionEdad", "restriccionEdadEsValido")
    }

    //console.log("restriccionEdad.value = " + restriccionEdad.value)
    //console.log("restriccionEdadEsValido = " + restriccionEdadEsValido)
    validarCampos()
})

nombre.addEventListener("keyup", function() {
    eliminarMensajeUnico("divAgregadoNombre")

    if (nombre.value.trim() == "") {
        agregarMensajeInvalido('El nombre no puede quedar vacio', "divAgregadoNombre")
        //camposValidos[nombreEsValido] = 0
        camposValidos["nombreEsValido"] = 0
    }
    else {camposValidos["nombreEsValido"] = 1}

    //console.log("nombreEsValido = " + nombreEsValido)
    validarCampos()
})

apodo.addEventListener("keyup", function() {
    eliminarMensajeUnico("divAgregadoApodo")

    if (apodo.value.trim() == "") {
        agregarMensajeInvalido('El apodo no puede quedar vacio', "divAgregadoApodo")
        camposValidos["apodoEsValido"] = 0
    }
    else {camposValidos["apodoEsValido"] = 1}

    //console.log("apodoEsValido = " + apodoEsValido)
    validarCampos()
})

mensaje.addEventListener("keyup", function() {
    eliminarMensajeUnico("divAgregadoMensaje")

    if (mensaje.value.trim() == "") {
        agregarMensajeInvalido('El mensaje no puede quedar vacio', "divAgregadoMensaje")
        camposValidos["mensajeEsValido"] = 0
    } else {camposValidos["mensajeEsValido"] = 1}

    //console.log("mensajeEsValido = " + mensajeEsValido)
    validarCampos()
})

email.addEventListener("keyup", function() {
    eliminarMensajeUnico("divAgregadoEmail")

    if (email.value.trim() == "") {
        agregarMensajeInvalido('El email no puede quedar vacio', "divAgregadoEmail")
        camposValidos["emailEsValido"] = 0
    } else {camposValidos["emailEsValido"] = 1}

    //console.log("emailEsValido = " + emailEsValido)
    validarCampos()
})

plataforma.addEventListener("change", function() {
    eliminarMensajeUnico("divAgregadoPlataforma")

    validarSelector('En plataforma', "plataforma", "plataformaEsValida")
})