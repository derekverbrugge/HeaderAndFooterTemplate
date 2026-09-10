
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

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

initialize();
