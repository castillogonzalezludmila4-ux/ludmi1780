

// 📅 Fecha mínima: hoy no puede ser pasado
const campoFecha = document.getElementById('fecha');
const hoy = new Date().toISOString().split('T')[0];
campoFecha.setAttribute('min', hoy);

// 📌 Mostrar/ocultar campo "otro motivo"
const selectMotivo = document.getElementById('motivo');
const otroMotivoDiv = document.getElementById('otroMotivoDiv');

selectMotivo.addEventListener('change', function() {
    if (this.value === 'OTRO') {
        otroMotivoDiv.style.display = 'block';
        document.getElementById('otroMotivo').setAttribute('required', 'required');
    } else {
        otroMotivoDiv.style.display = 'none';
        document.getElementById('otroMotivo').removeAttribute('required');
    }
});

// 📤 Envío del formulario
const formulario = document.getElementById('formularioVisita');
const mensajeExito = document.getElementById('mensajeExito');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // 📋 Recopilar todos los datos
    const datosVisita = {
        nombre: document.getElementById('nombre').value,
        tipoDoc: document.getElementById('tipoDoc').value,
        documento: document.getElementById('documento').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value || 'No especificada',
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        motivo: document.getElementById('motivo').value,
        otroMotivo: document.getElementById('otroMotivo').value || 'N/A',
        personas: document.getElementById('personas').value,
        quienEs: document.getElementById('quienEs').value,
        recordatorio: document.getElementById('recordatorio').checked,
        fechaSolicitud: new Date().toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    // 💾 Guardar en localStorage
    let visitas = JSON.parse(localStorage.getItem('historialVisitas') || '[]');
    visitas.push(datosVisita);
    localStorage.setItem('historialVisitas', JSON.stringify(visitas));
    localStorage.setItem('ultimaVisita', JSON.stringify(datosVisita));

    // 📅 Formatear fecha para mostrar
    const fechaObj = new Date(datosVisita.fecha + 'T00:00:00');
    const fechaFormateada = fechaObj.toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // 📝 Llenar resumen
    document.getElementById('rNombre').textContent = datosVisita.nombre;
    document.getElementById('rFecha').textContent = fechaFormateada;
    document.getElementById('rHora').textContent = datosVisita.hora + ' hs';
    
    const textoMotivo = datosVisita.motivo === 'OTRO' 
        ? 'Otro: ' + datosVisita.otroMotivo 
        : datosVisita.motivo.replace('_', ' ');
    document.getElementById('rMotivo').textContent = textoMotivo;
    document.getElementById('rFechaHoy').textContent = datosVisita.fechaSolicitud;
    document.getElementById('rCorreo').textContent = datosVisita.correo;

    // ✅ Mostrar mensaje de éxito
    formulario.classList.add('oculto');
    mensajeExito.classList.remove('oculto');

    console.log("✅ Visita registrada:", datosVisita);
});

// 🔄 Reiniciar formulario
function reiniciarFormulario() {
    formulario.reset();
    formulario.classList.remove('oculto');
    mensajeExito.classList.add('oculto');
    otroMotivoDiv.style.display = 'none';
}

// 🗑️ Limpiar al presionar botón de limpiar
formulario.addEventListener('reset', function() {
    setTimeout(() => {
        otroMotivoDiv.style.display = 'none';
    }, 0);
});