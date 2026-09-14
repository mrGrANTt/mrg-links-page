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

const tabs = [
    [document.getElementById("links_page"), document.getElementById("links")],
    [document.getElementById("gallery_page"), document.getElementById("gallery")],
    [document.getElementById("projects_page"), document.getElementById("projects")]
]
tabs[0][0].onclick = onTabsClicked
tabs[1][0].onclick = onTabsClicked
tabs[2][0].onclick = onTabsClicked
selected = 0;

function onTabsClicked(ev) {
    click = ev.target;
    if (click == tabs[selected][0]) return
    for (i = 0; i < 3; i++) {
        if (tabs[i][0] == click) {
            last = tabs[selected];
            selected = i;
            last[0].classList.remove("selected");
            last[1].style.display = "none";
            tabs[i][0].classList.add("selected");
            tabs[i][1].style.display = "inline-block";
            return
        }
    }
}
