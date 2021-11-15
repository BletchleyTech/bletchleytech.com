document.querySelector("#back").addEventListener("click", () => {
    window.history.back();
});

document.querySelector("#home").addEventListener("click", () => {
    window.location.href = "/";
});