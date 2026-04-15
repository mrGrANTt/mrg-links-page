const btn = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light");
    btn.textContent = "🌙";
}

btn.addEventListener("click", () => {
    body.classList.toggle("light");

    const isLight = body.classList.contains("light");

    btn.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("theme", isLight ? "light" : "dark");
    loadColors();
});