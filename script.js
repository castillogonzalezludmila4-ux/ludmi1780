
document.addEventListener('DOMContentLoaded', () => {
    console.log("%c[STN2 SISTEMA ACTIVO]: Script cargado correctamente.", "color: #00b4d8; font-family: monospace; font-weight: bold;");
    initMobileMenu();
});

// Control del menú móvil
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.className = isHidden ? "fa-solid fa-bars text-xl" : "fa-solid fa-xmark text-xl";
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = "fa-solid fa-bars text-xl";
        });
    });
}

// Interacción de pestañas en el Hero (Estudiantes / Familias / Docentes)
function cambiarTabHero(tipo) {
    const btnEstudiantes = document.getElementById('tab-estudiantes');
    const btnFamilias = document.getElementById('tab-familias');
    const btnDocentes = document.getElementById('tab-docentes');
    const contenido = document.getElementById('contenido-tab-hero');

    // Resetear estilos de botones
    [btnEstudiantes, btnFamilias, btnDocentes].forEach(b => {
        b.className = "px-4 py-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white transition";
    });

    if (tipo === 'estudiantes') {
        btnEstudiantes.className = "px-4 py-2 rounded-lg bg-turquoise-450 text-navy-900 font-bold transition";
        contenido.innerHTML = "Acceso a calculadora de promedios técnicos, estado de matrícula regular y herramientas de práctica.";
    } else if (tipo === 'familias') {
        btnFamilias.className = "px-4 py-2 rounded-lg bg-turquoise-450 text-navy-900 font-bold transition";
        contenido.innerHTML = "Información sobre inscripciones, constancias de alumno regular, horarios de atención y contacto con secretaría.";
    } else if (tipo === 'docentes') {
        btnDocentes.className = "px-4 py-2 rounded-lg bg-ambertech-500 text-navy-900 font-bold transition";
        contenido.innerHTML = "Espacio exclusivo para profesores: Diseños curriculares, registro de clases y circulares oficiales de secretaría.";
    }
}

// Calculadora de promedio ponderado técnico
function calcularPromedio() {
    const n1 = parseFloat(document.getElementById('nota1').value);
    const n2 = parseFloat(document.getElementById('nota2').value);
    const nt = parseFloat(document.getElementById('notataller').value);
    const resultadoDiv = document.getElementById('resultado-calc');
    const textoResultado = document.getElementById('texto-resultado');

    if (isNaN(n1) || isNaN(n2) || isNaN(nt)) {
        showToast("Complete todas las calificaciones.", "danger");
        return;
    }

    const promedioFinal = (n1 * 0.4) + (n2 * 0.4) + (nt * 0.2);
    resultadoDiv.classList.remove('hidden');

    if (promedioFinal >= 7.0) {
        textoResultado.className = "text-2xl font-bold text-turquoise-300";
        textoResultado.innerHTML = `${promedioFinal.toFixed(2)} - Aprobado (Promoción Directa)`;
        showToast("¡Excelente promedio alcanzado!", "success");
    } else if (promedioFinal >= 4.0) {
        textoResultado.className = "text-2xl font-bold text-ambertech-500";
        textoResultado.innerHTML = `${promedioFinal.toFixed(2)} - En Proceso / Instancia Evaluativa`;
        showToast("Instancia de recuperación requerida.", "warning");
    } else {
        textoResultado.className = "text-2xl font-bold text-red-400";
        textoResultado.innerHTML = `${promedioFinal.toFixed(2)} - Desaprobado`;
        showToast("Materia desaprobada. Requiere intensificación.", "danger");
    }
}

// Registro rápido de clase docente
function registrarClaseDocente(event) {
    event.preventDefault();
    const docente = document.getElementById('docente-nombre').value;
    const curso = document.getElementById('curso-docente').value;
    const tema = document.getElementById('tema-docente').value;
    const feedback = document.getElementById('docente-feedback');

    feedback.classList.remove('hidden');
    feedback.innerHTML = `<i class="fa-solid fa-circle-check text-turquoise-450 mr-1.5"></i> Registro guardado: Profesor ${docente} (${curso}) - Tema: "${tema}".`;
    showToast("Temario registrado exitosamente en la base interna.", "success");
    event.target.reset();
}

// Consulta de matrícula STN2
function consultarMatricula() {
    const dniInput = document.getElementById('dni-input');
    const resultadoMatricula = document.getElementById('resultado-matricula');
    const textoMatricula = document.getElementById('texto-matricula');

    if (!dniInput || !resultadoMatricula || !textoMatricula) return;
    const dni = dniInput.value.trim();

    if (!dni || dni.length < 7 || !/^\d+$/.test(dni)) {
        showToast("Ingrese un DNI válido (mínimo 7 dígitos).", "danger");
        return;
    }

    resultadoMatricula.classList.remove('hidden');
    textoMatricula.className = "text-sm font-semibold text-turquoise-300";
    textoMatricula.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5"></i> Legajo DNI ${dni}: Alumno Regular Habilitado - Ciclo Lectivo 2026.`;
    showToast("Consulta procesada con éxito.", "success");
}

// Envío de formulario de contacto
function enviarMensaje(event) {
    event.preventDefault();
    showToast("Enviando mensaje a secretaría...", "warning");
    setTimeout(() => {
        showToast("¡Mensaje enviado con éxito!", "success");
        event.target.reset();
    }, 1000);
}

// Sistema de Notificaciones Toast
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    let iconClass = "fa-solid fa-circle-check text-turquoise-300";
    if (type === 'warning') iconClass = "fa-solid fa-triangle-exclamation text-ambertech-500";
    if (type === 'danger') iconClass = "fa-solid fa-circle-xmark text-red-400";

    toast.innerHTML = `<i class="${iconClass} text-lg"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}