const mainDiv = document.getElementById("mainDiv");

function añadirContenido(contenidoTitulo, contenido) {
    let divPadre = document.createElement("div");
    
    let titulo = document.createElement("h3");
    titulo.className = "body-subtitle";
    titulo.textContent = contenidoTitulo;
    divPadre.appendChild(titulo);

    let listaCambios = document.createElement("ul");
    listaCambios.className = "larger_text";
    for (let i = 0; i < contenido.length; i++) {
        let cambio = contenido[i];
        let itemCambio = document.createElement("li");
        itemCambio.textContent = cambio;
        listaCambios.appendChild(itemCambio);
    };
    divPadre.appendChild(listaCambios);

    mainDiv.appendChild(divPadre);
}

añadirContenido("Version 0.2.2 - 30/10/2025", [
    "Creadas funciones de clase para evitar repetición y mejorar modularidad",
    "NUEVO: Ahora tenes un mensaje que dice 'Not playing' cuando deshabilitas un personaje",
]);
añadirContenido("Version 0.2.1 - 28/10/2025", [
    "Borradas las lineas de código comentadas que estaban sin usar",
    "Ahora hay mejores bases sobre las cuales construir",
    "FALTA: Definir funciones para ayudar a la lectura y evitar repetición de código",
]);
añadirContenido("Version 0.2 - 27/10/2025", [
    "Añadida una lógica para que los cuerpos sean relativos a la resolución",
    "Ahora la relación de aspecto puede cambiarse sin modificar (mucho) el gameplay.",
    "Problema conocido: El movimiento de los cuerpos sigue siendo el mismo. Esto hace que en resoluciones chicas sea muy rapido y viceversa",
]);