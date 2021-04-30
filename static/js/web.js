let i = 0;
const text = 'Web Development';

const title = () => {
    if (i < text.length) {
        document.querySelector("h1").innerHTML += text.charAt(i);
        i++;
        setTimeout(title, 300);
    }
    if (document.querySelector("h1").innerHTML == text)  {
        document.querySelector(".bi-arrow-down-short").style.animation = 'down 3s infinite';
    }
}

title();

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