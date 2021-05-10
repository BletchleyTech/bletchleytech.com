const text = 'Web Development';

document.querySelector("#pricing .front button").addEventListener("click", () => {
    window.location.href = "/contact/?service=web&type=front#contact";
});

document.querySelector("#pricing .back button").addEventListener("click", () => {
    window.location.href = "/contact/?service=web&type=back#contact";
});

document.querySelector("#pricing .full button").addEventListener("click", () => {
    window.location.href = "/contact/?service=web&type=full#contact";
});