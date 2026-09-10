
async function loadComponent(id, file) {
  const container = document.getElementById(id);

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Could not load ${file}`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.textContent = "Unable to load this section.";
  }
}

async function initialize() {
  await loadComponent("header", "header.html");
  await loadComponent("footer", "footer.html");

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
      });
    });
  }

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

initialize();
