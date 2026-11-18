document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const isEs = path.includes("/es/");
  const lang = isEs ? "es" : "eus";
  const currentFile = path.split("/").pop() || "index.html";

  // Equivalencias entre páginas para mantener el mismo ejercicio al cambiar de idioma
  const pageMap = {
    eusToEs: {
      "index.html": "index.html",
      "kontrol_egiturak.html": "estructuras_control.html",
      "array.html": "array.html",
      "arrayList.html": "arrayList.html",
      "poo.html": "index.html" // Fallback mientras no exista es/poo.html
    },
    esToEus: {
      "index.html": "index.html",
      "estructuras_control.html": "kontrol_egiturak.html",
      "array.html": "array.html",
      "arrayList.html": "arrayList.html"
    }
  };

  const targetEs = pageMap.eusToEs[currentFile] || "index.html";
  const targetEus = pageMap.esToEus[currentFile] || "index.html";

  // Configuración de menús según el idioma actual
  const menus = {
    eus: [
      {
        title: "Hasiera",
        items: [{ label: "Kaixo!", href: "index.html" }]
      },
      {
        title: "Java Ariketak",
        items: [
          { label: "Kontrol egiturak", href: "kontrol_egiturak.html" },
          { label: "Arrayak", href: "array.html" },
          { label: "POO (Klaseak eta Objektuak)", href: "poo.html" },
          { label: "ArrayListak", href: "arrayList.html" }
        ]
      }
    ],
    es: [
      {
        title: "Inicio",
        items: [{ label: "¡Hola!", href: "index.html" }]
      },
      {
        title: "Ejercicios Java",
        items: [
          { label: "Estructuras de control", href: "estructuras_control.html" },
          { label: "Arrays", href: "array.html" },
          { label: "ArrayLists", href: "arrayList.html" }
        ]
      }
    ]
  };

  // Envolver el contenido original de la página en <main class="app-content">
  const mainContent = document.createElement("main");
  mainContent.className = "app-content";
  while (document.body.firstChild) {
    mainContent.appendChild(document.body.firstChild);
  }

  // Crear barra lateral
  const sidebar = document.createElement("aside");
  sidebar.className = "app-sidebar";

  const eusLink = isEs ? `../eus/${targetEus}` : currentFile;
  const esLink = isEs ? currentFile : `../es/${targetEs}`;

  let navHtml = `
    <div class="lang-switcher">
      <a href="${eusLink}" class="${!isEs ? "active-lang" : ""}" title="Euskara">
        <img src="../eus.png" alt="Euskara"> EUS
      </a>
      <a href="${esLink}" class="${isEs ? "active-lang" : ""}" title="Español">
        <img src="../es.png" alt="Español"> ES
      </a>
    </div>
    <nav class="sidebar-nav">
  `;

  menus[lang].forEach((section) => {
    navHtml += `<div class="nav-section"><p class="nav-title">${section.title}</p><ul>`;
    section.items.forEach((item) => {
      const activeClass = currentFile === item.href ? ' class="active"' : "";
      navHtml += `<li><a href="${item.href}"${activeClass}>${item.label}</a></li>`;
    });
    navHtml += `</ul></div>`;
  });

  navHtml += `</nav>`;
  sidebar.innerHTML = navHtml;

  // Insertar layout completo
  document.body.classList.add("has-sidebar");
  document.body.appendChild(sidebar);
  document.body.appendChild(mainContent);
});