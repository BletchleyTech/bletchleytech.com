document.querySelectorAll("aside.row #actions button").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.classList[0];
        document.querySelectorAll(`aside.row #actions button:not(.${id})`).forEach(notButton => {
            notButton.classList.remove("active");
        });
        button.classList.add("active");
        button.classList.add
        document.querySelectorAll(`aside.row #forms form:not(#${id})`).forEach(form => {
            form.classList.remove("show");
        });
        document.querySelector(`aside.row #forms form#${id}`).classList.add("show");
    });
});