
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portal Institucional E.E.S.T. N° 2 Valentín Alsina inicializado correctamente.");

  // 1. Menú Responsive
  const btnMenu = document.getElementById("btn-menu");
  const navLinks = document.getElementById("nav-links");

  if (btnMenu && navLinks) {
    btnMenu.addEventListener("click", () => {
      navLinks.classList.toggle("abierto");
    });

    // Cerrar menú al hacer clic en enlaces
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("abierto");
      });
    });
  }

  // 2. Animación de Contadores en Hero Stats
  const statNums = document.querySelectorAll(".stat-num");
  let animated = false;

  const runCounters = () => {
    statNums.forEach(numEl => {
      const target = +numEl.getAttribute("data-target");
      let count = 0;
      const speed = target / 40;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          numEl.innerText = Math.ceil(count) + (target === 100 ? "%" : "+");
          setTimeout(updateCount, 40);
        } else {
          numEl.innerText = target + (target === 100 ? "%" : "+");
        }
      };
      updateCount();
    });
  };

  // Disparar contadores al hacer scroll cerca del hero
  window.addEventListener("scroll", () => {
    if (!animated && window.scrollY > 50) {
      runCounters();
      animated = true;
    }
  });

  // 3. Sistema de Pestañas (Tabs) de Innovación
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.getAttribute("data-tab"));
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // 4. Pestañas del Campus Digital
  const campusBtns = document.querySelectorAll(".campus-btn");
  const campusPanels = document.querySelectorAll(".campus-panel");

  campusBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      campusBtns.forEach(b => b.classList.remove("active"));
      campusPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(btn.getAttribute("data-target"));
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // 5. Calculadora de Promedio Técnico
  const formPromedio = document.getElementById("form-promedio");
  const resultadoContainer = document.getElementById("resultado-container");

  if (formPromedio) {
    formPromedio.addEventListener("submit", (e) => {
      e.preventDefault();
      const n1 = parseFloat(document.getElementById("calc-nota1").value);
      const n2 = parseFloat(document.getElementById("calc-nota2").value);
      const n3 = parseFloat(document.getElementById("calc-nota3").value);

      const promedio = (n1 * 0.3 + n2 * 0.3 + n3 * 0.4).toFixed(2);
      
      let htmlResultado = "";
      if (promedio >= 7.0) {
        htmlResultado = `
          <div style="color: #34d399; text-align: center;">
            <span style="font-size: 3rem;">🎉</span>
            <h3 style="color: #34d399; margin: 10px 0;">¡Materia Aprobada!</h3>
            <p style="font-size: 1.2rem; font-weight: bold;">Promedio Final: ${promedio}</p>
            <p style="font-size: 0.88rem; color: #94a3b8; margin-top: 8px;">El alumno cumple con los estándares exigidos por el ciclo técnico.</p>
          </div>
        `;
      } else {
        htmlResultado = `
          <div style="color: #f87171; text-align: center;">
            <span style="font-size: 3rem;">⚠️</span>
            <h3 style="color: #f87171; margin: 10px 0;">Instancia de Intensificación</h3>
            <p style="font-size: 1.2rem; font-weight: bold;">Promedio Final: ${promedio}</p>
            <p style="font-size: 0.88rem; color: #94a3b8; margin-top: 8px;">Requiere tutoría y período de recuperación de saberes técnicos.</p>
          </div>
        `;
      }
      resultadoContainer.innerHTML = htmlResultado;
    });
  }

  // 6. Gestión Dinámica de Cursos y Matrícula (Local Storage)
  const cursosIniciales = [
    { id: "1-1", nombre: "1° 1ª", ciclo: "1ro", turno: "Mañana", orientacion: "Ciclo Básico Técnico", alumnos: 34 },
    { id: "1-2", nombre: "1° 2ª", ciclo: "1ro", turno: "Mañana", orientacion: "Ciclo Básico Técnico", alumnos: 32 },
    { id: "1-3", nombre: "1° 3ª", ciclo: "1ro", turno: "Tarde", orientacion: "Ciclo Básico Técnico", alumnos: 35 },
    { id: "1-4", nombre: "1° 4ª", ciclo: "1ro", turno: "Tarde", orientacion: "Ciclo Básico Técnico", alumnos: 31 },
    { id: "4-1", nombre: "4° 1ª", ciclo: "superior", turno: "Tarde", orientacion: "Informática / Programación", alumnos: 28 },
    { id: "4-2", nombre: "4° 2ª", ciclo: "superior", turno: "Tarde", orientacion: "Electromecánica", alumnos: 26 },
    { id: "5-1", nombre: "5° 1ª", ciclo: "superior", turno: "Vespertino", orientacion: "Software y Redes", alumnos: 24 },
    { id: "6-1", nombre: "6° 1ª", ciclo: "superior", turno: "Vespertino", orientacion: "Automatización Industrial", alumnos: 22 }
  ];

  let cursos = JSON.parse(localStorage.getItem("eest2_cursos")) || cursosIniciales;
  let filtroCursos = "todos";

  const guardarCursos = () => {
    localStorage.setItem("eest2_cursos", JSON.stringify(cursos));
  };

  const renderCursos = () => {
    const grid = document.getElementById("grid-cursos-dinamico");
    if (!grid) return;
    grid.innerHTML = "";

    const filtrados = filtroCursos === "todos" 
      ? cursos 
      : cursos.filter(c => c.ciclo === filtroCursos);

    filtrados.forEach(curso => {
      const card = document.createElement("div");
      card.className = "curso-card";
      card.innerHTML = `
        <div>
          <div class="curso-header-card">
            <h4>${curso.nombre}</h4>
            <span class="badge-turno">${curso.turno}</span>
          </div>
          <p style="color: var(--texto-suave); font-size: 0.85rem;">${curso.orientacion}</p>
        </div>
        <div class="curso-controles">
          <span><strong>${curso.alumnos}</strong> alumnos</span>
          <div>
            <button class="btn-mini" onclick="modificarMatricula('${curso.id}', -1)">-</button>
            <button class="btn-mini" onclick="modificarMatricula('${curso.id}', 1)">+</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  window.modificarMatricula = (id, delta) => {
    const curso = cursos.find(c => c.id === id);
    if (curso && curso.alumnos + delta >= 0) {
      curso.alumnos += delta;
      guardarCursos();
      renderCursos();
    }
  };

  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtroCursos = btn.getAttribute("data-filtro");
      renderCursos();
    });
  });

  renderCursos();

  // 7. Repositorio de Apuntes Docentes
  let materiales = JSON.parse(localStorage.getItem("eest2_materiales")) || [
    { docente: "Prof. Ing. Martínez", materia: "Laboratorio de Diseño Web", titulo: "Guía N° 1 - Estructuras HTML5 y Flexbox" },
    { docente: "Prof. Gómez", materia: "Programación Orientada a Objetos", titulo: "Apunte Teórico - Clases y Objetos en Python" }
  ];

  const renderMateriales = () => {
    const lista = document.getElementById("lista-materiales-repositorio");
    if (!lista) return;
    lista.innerHTML = "";

    materiales.forEach(mat => {
      const item = document.createElement("div");
      item.className = "item-repo";
      item.innerHTML = `
        <div>
          <strong>${mat.titulo}</strong>
          <small>📘 ${mat.materia} | 👨‍🏫 ${mat.docente}</small>
        </div>
        <a href="#campus" class="btn-descargar" onclick="alert('📥 Descargando material didáctico...')">Descargar</a>
      `;
      lista.appendChild(item);
    });
  };

  const formMaterial = document.getElementById("form-material");
  if (formMaterial) {
    formMaterial.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevo = {
        docente: document.getElementById("mat-docente").value.trim(),
        materia: document.getElementById("mat-materia").value,
        titulo: document.getElementById("mat-titulo").value.trim()
      };
      materiales.unshift(nuevo);
      localStorage.setItem("eest2_materiales", JSON.stringify(materiales));
      renderMateriales();
      formMaterial.reset();
      alert("✅ Material publicado exitosamente en el repositorio.");
    });
  }

  renderMateriales();

  // 8. Formulario de Inscripción 2026
  let aspirantes = JSON.parse(localStorage.getItem("eest2_aspirantes")) || [
    { nombre: "Benítez, Thiago Nahuel", dni: "50.987.654", primaria: "EP N° 12 Valentín Alsina", turno: "Mañana" }
  ];

  const renderAspirantes = () => {
    const tbody = document.getElementById("tabla-aspirantes-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    aspirantes.forEach(asp => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${asp.nombre}</strong></td>
        <td>${asp.dni}</td>
        <td>${asp.primaria}</td>
        <td>${asp.turno}</td>
        <td><span class="badge-estado">Preinscripto</span></td>
      `;
      tbody.appendChild(tr);
    });
  };

  const formInscripcion = document.getElementById("form-inscripcion");
  if (formInscripcion) {
    formInscripcion.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevoAsp = {
        nombre: document.getElementById("ins-nombre").value.trim(),
        dni: document.getElementById("ins-dni").value.trim(),
        primaria: document.getElementById("ins-primaria").value.trim(),
        turno: document.getElementById("ins-turno").value
      };
      aspirantes.unshift(nuevoAsp);
      localStorage.setItem("eest2_aspirantes", JSON.stringify(aspirantes));
      renderAspirantes();
      formInscripcion.reset();
      alert("✅ Preinscripción registrada con éxito en el sistema de la E.E.S.T. N° 2.");
    });
  }

  renderAspirantes();
});