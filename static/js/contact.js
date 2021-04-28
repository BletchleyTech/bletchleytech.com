let i = 0;
const text = 'Contact Us';

const title = () => {
    document.querySelector("h1").innerHTML += text.charAt(i);
    i++;
    setTimeout(title, 300);
    if (document.querySelector("h1").innerHTML == text) {
        document.querySelector(".bi-arrow-down-short").style.animation = "down 3s infinite";
    }
}

title();