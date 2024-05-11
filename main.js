function setupSectionObserver() {
  const sections = Array.from(document.querySelectorAll("section"));
  const options = {
    root: null, // Se observa respecto al viewport
    rootMargin: "0px",
    threshold: 0.5, // El callback se ejecutará cuando el 50% del elemento esté visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const currentIndex = sections.indexOf(entry.target);
      const hasNextSection = currentIndex < sections.length - 1;
      const hasPreviousSection = currentIndex > 0;

      if (entry.isIntersecting) {
        console.log("xxx");
        updateNavigation(entry.target.id);
        updateDownButton(entry.target.id, hasNextSection);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
}
const navLinks = document.querySelectorAll("nav a");
const logoContainer = document.getElementById("logo-container");
const homeLogoContainer = document.querySelector("#home .logo");
const homeLogo = homeLogoContainer
  ? homeLogoContainer.querySelector("img")
  : null;
const header = document.querySelector("header");
function updateNavigation(activeId) {
  // Asegúrate de que el logo existe en el contenedor de home antes de intentar manipularlo

  console.log("aaasssss");
  console.log(homeLogo);

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${activeId}`
    );
  });
  console.log("rrrr");
  console.log(activeId !== "home" && homeLogo);

  if (activeId !== "home") {
    // Si la sección activa no es 'home', añade la clase 'not-home'
    header.classList.add("not-home");
    document.querySelector("nav").style.cssText = "float: right;"; // Alinea el menú a la derecha
  } else {
    // Si la sección activa es 'home', remueve la clase 'not-home'
    header.classList.remove("not-home");
    document.querySelector("nav").style.cssText = "float: none;"; // Restablece el estilo del menú
  }

  if (activeId !== "home" && homeLogo) {
    // Mueve el logo al header si no está en 'home' y el logo existe
    if (!logoContainer.contains(homeLogo)) {
      homeLogo.classList.add("small-logo");
      logoContainer.appendChild(homeLogo);
    }
    document.querySelector("nav").style.cssText = "float: right;"; // Alinea el menú a la derecha
  } else {
    // Mueve el logo de vuelta a la sección 'home' si está en 'home' y el logo existe
    if (homeLogoContainer && !homeLogoContainer.contains(homeLogo)) {
      console.log(homeLogoContainer);
      console.log(homeLogo);
      homeLogo.classList.remove("small-logo");
      homeLogoContainer.appendChild(homeLogo);
    }
    document.querySelector("nav").style.cssText = "float: none;"; // Restablece el estilo del menú
    // Asegura que el logo se elimine del header

    //console.log(logoContainer.contains(homeLogo));
    //if (logoContainer.contains(homeLogo)) {
    //    logoContainer.removeChild(homeLogo);
    //}
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupSectionObserver();
  transitionInClickMenu();
  EventClickDownButton();
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var currentComponent = document.querySelector(".content-section");

      if (currentComponent) {
        removeInfoTerrabox();
      }

      addInfoTerrabox(this.id);
    
    });
  });

  
});

var componentWhatIs = `
<div id="content-que-es" class="content-section">
  <p>
    TerraBox es esencial por su capacidad de mejorar 
    significativamente la gestión de residuos, disminuyendo el impacto
    ambiental y fomentando la conciencia ecológica. Este proyecto
    innovador no solo utiliza tecnología avanzada para optimizar
    el
    reciclaje, sino que también involucra a la comunidad através de un
    sistema de incentivos, ofreciendo beneficios económicos y
    adaptándos a diferentes entornos urbanos y rurales, políticas
  locales, y necesidad especificas de gestión de residuos.
  </p>
</div>
`;
  
var componentApproach = `
<div id="content-enfoque-y-abordaje" class="content-section">
  <p>
    Optimizar la recolección y gestión de materiales reciclables, con
    el fin de mejorar así la eficiencia en la reutilización urbana y
    fom entar la participación ciudadana. Metodología El proyecto se
    enfocará en el diseño, implementación y evaluación del TerraBox
    mediante técnicas de ingeniería y análisis de sostenibilidad. con
    pruebas piloto y recopilación de datos para medir su impacto y
    eficaci
  </p>
</div>`;

var componentProposal = `
<div id="content-propuesta" class="content-section">
  <ul id="proposal-list">
    <li>
      Puerto la Cruz
      <ul>
        <li>Paseo Colón</li>
      </ul>
    </li>
    <li>
      Barcelona
      <ul>
        <li>Plaza Bolívar</li>
      </ul>
    </li>
    <li>
      Lechería
      <ul>
        <li>Comedor Popular</li>
        <li>Turístico</li>
        <li>Alberto Lovera</li>
      </ul>
    </li>
  </ul>
</div>
`;

var containerInfo = document.querySelector("#product-content");

function addInfoTerrabox(concept) {
  var currentComponent = ''
  if (concept === "what-is") {
    containerInfo.innerHTML = componentWhatIs;
    currentComponent = document.querySelector(".content-section");
  }else if (concept === "approach") {
    containerInfo.innerHTML = componentApproach;
    currentComponent = document.querySelector(".content-section");
  }else if (concept === "proposal") {
    containerInfo.innerHTML = componentProposal;
    currentComponent = document.querySelector(".content-section");
  }

  setTimeout(() => {
    currentComponent.classList.toggle("active");
  }, 100);
}

function removeInfoTerrabox() {
  containerInfo.innerHTML = "";
}

function transitionInClickMenu() {
  const menuLinks = document.querySelectorAll("nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

      // Obtener el ID de la sección objetivo desde el atributo href del enlace
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // Comprobar si la sección objetivo existe
      if (targetSection) {
        // Realizar un scroll suave hacia la sección objetivo
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function updateDownButton(section, hasNextSection) {
  containerButton = document.getElementById("scroll-indicator");
  if (section !== "home") {
    containerButton.classList.add("only-icon");
  } else {
    containerButton.classList.remove("only-icon");
  }
  if (!hasNextSection) {
    containerButton.classList.add("hidden");
  } else {
    containerButton.classList.remove("hidden");
  }
}

function EventClickDownButton() {
  const downButton = document.querySelector("#scroll-indicator");
  downButton.addEventListener("click", function () {
    moveToNextSection();
  });
}

function moveToNextSection() {
  // Obtiene todas las secciones
  const sections = Array.from(document.querySelectorAll("section"));
  // Encuentra la sección que está mayormente visible en la ventana
  const currentSectionIndex = sections.findIndex((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  });

  // Si hay una siguiente sección, haz scroll hacia ella
  if (currentSectionIndex !== -1 && currentSectionIndex + 1 < sections.length) {
    sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
  }
}
