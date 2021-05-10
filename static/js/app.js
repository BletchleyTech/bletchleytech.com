const text = 'App Development'

document.querySelector("#pricing .hybrid button").addEventListener("click", () => {
    window.location.href = "/contact/?service=app&type=hybrid#contact";
});

document.querySelector("#pricing .native button").addEventListener("click", () => {
    window.location.href = "/contact/?service=app&type=native#contact";
});