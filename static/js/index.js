let i = 0;
const text = 'Bletchley Tech';

const title = () => {
    if (i < text.length) {
        document.querySelector("h1").innerHTML += text.charAt(i);
        i++;
        setTimeout(title, 300);
    }
    if (document.querySelector("h1").innerText == text) {
        document.querySelector("#title p").classList.add("fade");
        document.querySelector("#title p").style.opacity = 1;
        setTimeout(() => {
            document.querySelector("#title .bi-arrow-down-short").style.animation = "down 2.5s infinite linear";
            document.querySelector("#title .bi-arrow-down-short").title = "Read More";
        }, 500);
    }
}

title();