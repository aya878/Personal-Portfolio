const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
});


// Dark / Light Mode
const themeButton = document.getElementById("theme-toggle-button");
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}

// Toggle theme when clicking the button
if (themeButton) {
  themeButton.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");

    const currentTheme = htmlElement.classList.contains("dark")
      ? "dark"
      : "light";

    localStorage.setItem("theme", currentTheme);
  });
}


// Portfolio Tabs / Filter
const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active to clicked button
    button.classList.add("active");

    const filterValue = button.dataset.filter;

    portfolioItems.forEach((item) => {
      const itemCategory = item.dataset.category;

      if (filterValue === "all" || filterValue === itemCategory) {
        item.style.display = "";
      } else {
 
        item.style.display = "none";
      }
    });
  });
});


// Settings Sidebar
const settingsSidebar = document.getElementById("settings-sidebar");
const settingsToggle = document.getElementById("settings-toggle");
const closeSettings = document.getElementById("close-settings");

function openSettings() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsSidebar.classList.add("translate-x-0");

  settingsSidebar.setAttribute("aria-hidden", "false");
  settingsToggle.setAttribute("aria-expanded", "true");
}

function hideSettings() {
  settingsSidebar.classList.add("translate-x-full");
  settingsSidebar.classList.remove("translate-x-0");

  settingsSidebar.setAttribute("aria-hidden", "true");
  settingsToggle.setAttribute("aria-expanded", "false");
}

if (settingsToggle && settingsSidebar) {
  settingsToggle.addEventListener("click", openSettings);
}

if (closeSettings && settingsSidebar) {
  closeSettings.addEventListener("click", hideSettings);
}


const colorsGrid = document.getElementById("theme-colors-grid");

const colors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#f97316",
  "#14b8a6"
];

function changeColor(color) {
  document.documentElement.style.setProperty("--color-primary", color);
  document.documentElement.style.setProperty("--color-accent", color);
  document.documentElement.style.setProperty("--color-secondary", color);

  localStorage.setItem("accentColor", color);
}

if (colorsGrid) {
  colors.forEach((color) => {
    const button = document.createElement("button");

    button.type = "button";
    button.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${color};
      cursor: pointer;
      border: 2px solid white;
    `;

    button.setAttribute("aria-label", `اختيار اللون ${color}`);

    button.addEventListener("click", () => {
      changeColor(color);
    });

    colorsGrid.appendChild(button);
  });

  const savedColor = localStorage.getItem("accentColor");

  if (savedColor) {
    changeColor(savedColor);
  }
}


// Font Settings
const fontOptions = document.querySelectorAll(".font-option");

function applyFont(font) {
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo"
  );

  document.body.classList.add(`font-${font}`);

  localStorage.setItem("selectedFont", font);

  fontOptions.forEach((option) => {
    const selected = option.dataset.font === font;

    option.classList.toggle("active", selected);
    option.setAttribute("aria-checked", selected);
  });
}

fontOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const font = option.dataset.font;

    if (["alexandria", "tajawal", "cairo"].includes(font)) {
      applyFont(font);
    }
  });
});

const savedFont = localStorage.getItem("selectedFont") || "tajawal";
applyFont(savedFont);