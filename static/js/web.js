const text = 'Web Development';

for (let button of document.querySelectorAll("#pricing button")) 
{
    button.addEventListener("click", () => {
        window.location.href = `/contact/?service=web&type=${button.parentElement.parentElement.classList[1]}#contact`;
    });
}