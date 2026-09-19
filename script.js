/*
  ============================================================
  SIMPLE SITE JAVASCRIPT
  ============================================================

  This file has three responsibilities:

    1. Load reusable HTML partials.
    2. Control the mobile navigation.
    3. Insert the current copyright year.

  That's it.

  There is no framework.
  There is no build system.
  There is no PHP.
*/


/*
  ============================================================
  LOAD AN HTML PARTIAL
  ============================================================

  elementId:
    The ID of the empty element where the HTML should go.

  filePath:
    The HTML file we want to load.

  Example:

    loadPartial("site-header", "header.html");

  means:

    Find:

      <div id="site-header"></div>

    and replace its contents with header.html.
*/

async function loadPartial(elementId, filePath) {

  /*
    Find the destination element.
  */
  const target = document.getElementById(elementId);


  /*
    If the page doesn't have this element, stop.

    This makes the function safe to use on different pages.
  */
  if (!target) {
    return;
  }


  /*
    Ask the browser to retrieve the HTML file.

    fetch() is built into modern browsers.
  */
  const response = await fetch(filePath);


  /*
    If the server couldn't provide the file, stop with
    an error.

    response.ok is true for successful HTTP responses.
  */
  if (!response.ok) {
    throw new Error(`Could not load ${filePath}`);
  }


  /*
    Convert the response into text.

    Because header.html and footer.html contain HTML,
    we then insert that HTML into the target element.
  */
  target.innerHTML = await response.text();
}



/*
  ============================================================
  MOBILE NAVIGATION
  ============================================================

  This function is only needed because our header contains
  a mobile menu button.

  If your site doesn't need a mobile menu, you can delete
  this entire function.
*/

function setupMobileMenu() {

  /*
    Find the hamburger button.
  */
  const menuToggle =
    document.querySelector(".menu-toggle");


  /*
    Find the navigation.
  */
  const navigation =
    document.querySelector("#site-navigation");


  /*
    If either element doesn't exist, there is nothing
    for this function to do.
  */
  if (!menuToggle || !navigation) {
    return;
  }


  /*
    Run this code whenever the hamburger button is clicked.
  */
  menuToggle.addEventListener("click", () => {

    /*
      Read the current accessibility state.

      The attribute contains either:

        "true"

      or:

        "false"
    */
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";


    /*
      Tell assistive technology that the menu has changed.

      If it was open, make it closed.

      If it was closed, make it open.
    */
    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );


    /*
      Add or remove the CSS class.

      CSS is responsible for actually showing or hiding
      the navigation.
    */
    navigation.classList.toggle(
      "is-open",
      !isOpen
    );
  });


  /*
    When somebody clicks a navigation link on mobile,
    close the menu.

    This isn't strictly necessary, but it makes the
    mobile experience nicer.
  */
  navigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navigation.classList.remove("is-open");

    });

  });

}



/*
  ============================================================
  COPYRIGHT YEAR
  ============================================================

  Finds:

    <span id="copyright-year"></span>

  and inserts the current year.
*/

function setCopyrightYear() {

  const yearElement =
    document.getElementById("copyright-year");


  /*
    The check makes the function safe even if a particular
    page doesn't have a copyright-year element.
  */
  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

}



/*
  ============================================================
  SITE INITIALIZATION
  ============================================================

  This is where everything gets started.
*/

async function initializeSite() {

  /*
    Load the header first.
  */
  await loadPartial(
    "site-header",
    "header.html"
  );


  /*
    Load the footer.
  */
  await loadPartial(
    "site-footer",
    "footer.html"
  );


  /*
    The header now exists in the document, so we can safely
    find its mobile-menu elements.
  */
  setupMobileMenu();


  /*
    The footer now exists in the document, so we can safely
    find the copyright-year element.
  */
  setCopyrightYear();

}



/*
  ============================================================
  START THE SITE
  ============================================================

  This one line starts the entire process.
*/

initializeSite();
