const icons = () => {
    for (let icon of document.querySelectorAll(".icons i")) {
        if (window.innerWidth < 300) {
            icon.classList.replace("fa-3x", "fa-2x")
        } else {
            if (icon.classList.contains("fa-2x"))
            {
                icon.classList.replace("fa-2x", "fa-3x");
            }
        }
    }
}

document.onload = icons;

window.onresize = icons;