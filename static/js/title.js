let i = 0;

const title = () => {
    if (i < text.length) {
        document.querySelector("h1").innerHTML += text.charAt(i);
        i++;
        setTimeout(title, 300);
    }
    if (document.querySelector("h1").innerHTML == text) {
            document.querySelector("#title .bi-arrow-down-short").style.animation = "down 3s infinite";
    }
}

try {
    title();
} catch (e) {}