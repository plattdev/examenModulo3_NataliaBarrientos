// Base de datos en local con las preguntas
const preguntas = [
    {
        pregunta: "¿Cuál es la nota más grave en una guitarra estándar?",
        opciones: ["Mi", "La", "Re", "Sol"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuántas cuerdas tiene una guitarra clásica?",
        opciones: ["4", "6", "8", "12"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué parte de la guitarra se utiliza para cambiar la afinación?",
        opciones: ["Cuerpo", "Mástil", "Clavijas", "Puente"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es la técnica para tocar rápidamente notas individuales en la guitarra?",
        opciones: ["Arpegio", "Palm mute", "Tapping", "Slide"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué tipo de guitarra es conocida por su cuerpo hueco y sonido resonante?",
        opciones: ["Eléctrica", "Clásica", "Acústica", "Bajo"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Quién es conocido como el 'Rey del Rock and Roll' y tocaba la guitarra?",
        opciones: ["Chuck Berry", "Jimi Hendrix", "Elvis Presley", "Eric Clapton"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué efecto de guitarra crea un sonido vibrante y oscilante?",
        opciones: ["Distorsión", "Wah-wah", "Chorus", "Flanger"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál es la escala musical más comúnmente utilizada en la música occidental?",
        opciones: ["Pentatónica", "Mayor", "Menor", "Blues"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué guitarrista es famoso por su uso del 'feedback' y técnicas innovadoras?",
        opciones: ["Jimmy Page", "Jimi Hendrix", "David Gilmour", "Slash"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué parte de la guitarra se llama 'traste'?",
        opciones: ["Las cuerdas", "El mástil", "Las divisiones en el mástil", "El cuerpo"],
        respuestaCorrecta: 2
    }
];

// Variables iniciales para el test
let preguntaActual = 0;
let puntuacion = 0;

// Referencia al contenedor principal del HTML
const app = document.getElementById('app');

// ==========================================
// FUNCIÓN: visualizar la estructura del test
// ==========================================
function mostrarTest() {
    //HTML inyectado desde JS con la estructura del test
    app.innerHTML = `
        <!-- Barra de progreso -->
        <div id="progreso-contenedor">
            <div id="progreso-barra"></div>
            <span id="progreso-texto">1 de ${preguntas.length}</span>
        </div>

        <!-- Pregunta -->
        <div id="pregunta-contenedor">
            <h2 id="pregunta-texto"></h2>
        </div>

        <!-- Opciones de respuesta -->
        <div id="opciones-contenedor"></div>

        <!-- Feedback (correcto/incorrecto) -->
        <div id="feedback-contenedor"></div>

        <!-- Botón siguiente -->
        <button id="siguiente-btn">Siguiente</button>
    `;

    // Ocultar botón siguiente inicialmente
    document.getElementById('siguiente-btn').style.display = 'none';

    // Mostrar la primera pregunta
    mostrarPregunta();
}

// ==========================================
// FUNCIÓN: Mostrar pregunta
// ==========================================
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    // Actualizar barra de progreso
    const progresoTexto = document.getElementById('progreso-texto');
    const progresoBarra = document.getElementById('progreso-barra');
    progresoTexto.textContent = `${preguntaActual + 1} de ${preguntas.length}`;
    progresoBarra.style.width = `${((preguntaActual + 1) / preguntas.length) * 100}%`;

    // Mostrar texto de la pregunta
    const preguntaTexto = document.getElementById('pregunta-texto');
    preguntaTexto.textContent = pregunta.pregunta;

    // Crear botones de opciones
    const opcionesContenedor = document.getElementById('opciones-contenedor');
    opcionesContenedor.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion-btn';
        boton.addEventListener('click', () => seleccionarRespuesta(index));
        opcionesContenedor.appendChild(boton);
    });

    // Limpiar feedback anterior
    document.getElementById('feedback-contenedor').innerHTML = '';

    // Ocultar botón siguiente
    document.getElementById('siguiente-btn').style.display = 'none';
}

// ==========================================
// FUNCIÓN: Manejar selección de respuesta
// ==========================================
function seleccionarRespuesta(indiceSeleccionado) {
    const pregunta = preguntas[preguntaActual];
    const esCorrecta = indiceSeleccionado === pregunta.respuestaCorrecta;

    // Sumar puntuación si es correcta
    if (esCorrecta) {
        puntuacion++;
    }

    // Mostrar feedback visual en los botones
    const botones = document.querySelectorAll('.opcion-btn');
    botones.forEach((boton, index) => {
        // Deshabilitar todos los botones
        boton.disabled = true;

        // Marcar la respuesta correcta en verde
        if (index === pregunta.respuestaCorrecta) {
            boton.style.backgroundColor = 'darkgreen';
            boton.style.color = 'white';
        }

        // Marcar la respuesta incorrecta seleccionada en rojo
        if (index === indiceSeleccionado && !esCorrecta) {
            boton.style.backgroundColor = 'lightcoral';
            boton.style.color = 'white';
        }
    });

    // Mostrar mensaje de feedback inmediato
    const feedbackContenedor = document.getElementById('feedback-contenedor');
    if (esCorrecta) {
        feedbackContenedor.innerHTML = '<p style="color: green;">¡Correcto! ✓</p>';
    } else {
        feedbackContenedor.innerHTML = '<p style="color: lightcoral;">Incorrecto ✗</p>';
    }

    // Mostrar botón siguiente
    const siguienteBtn = document.getElementById('siguiente-btn');
    siguienteBtn.style.display = 'block';

    // Configurar acción del botón siguiente
    siguienteBtn.onclick = () => {
        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarResultados();
        }
    };
}

// ==========================================
// FUNCIÓN: Mostrar pantalla de resultados
// ==========================================
function mostrarResultados() {
    const porcentaje = Math.round((puntuacion / preguntas.length) * 100);

    // Determinar mensaje personalizado
    let mensaje = '';
    if (puntuacion <= 4) {
        mensaje = 'Necesitas repasar más.';
    } else if (puntuacion <= 7) {
        mensaje = '¡Bien hecho!, vas por buen camino.';
    } else {
        mensaje = '¡Excelente!, dominas el tema.';
    }

    //HTML inyectado desde JS con la parte de resultados
    app.innerHTML = `
        <div id="resultados-contenedor">
            <h2> Resultados del Test 🎸</h2>

            <p>PUNTUACIÓN TOTAL: ${puntuacion} de ${preguntas.length} respuestas correctas</p>
            <p>PORCENTAJE DE ACIERTO: ${porcentaje}%</p>
            <p>${mensaje}</p>

            <button id="reiniciar-btn">Reiniciar test</button>
        </div>
    `;

    // Configurar botón reiniciar
    document.getElementById('reiniciar-btn').addEventListener('click', reiniciarTest);
}

// ==========================================
// FUNCIÓN: Reiniciar el test
// ==========================================
function reiniciarTest() {
    preguntaActual = 0;
    puntuacion = 0;
    mostrarTest();
}

// ==========================================
// INICIAR EL TEST
// ==========================================
mostrarTest();

