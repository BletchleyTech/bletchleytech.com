document.querySelectorAll("#pricing .card button").forEach((button) => {
    button.addEventListener("click", () => {
        window.location.href = `/contact/?service=${document.querySelector("#intro").classList[1]}&type=${button.parentElement.parentElement.classList[1]}#contact`;
    });
});