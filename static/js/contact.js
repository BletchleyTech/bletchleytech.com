const text = 'Contact Us';

if (window.location.href.includes("?"))
{
    const service = {"web": [0, "I'm interested in your Front End/Back End/Full Stack (choose one) Web Development service."], "app": [1, "I'm interested in your Native/Hybrid (choose one) App Development service."]};
    let query = window.location.href.split("?").splice(1)[0].split("&")[0].split("=")[1];
    if (query.includes("#"))
    {
        document.querySelector("select").selectedIndex = service[query.split("#")[0]][0];
        document.querySelector("textarea").value = service[query.split("#")[0]][1];
    }
    else
    {
        document.querySelector("select").selectedIndex = service[query][0];
        document.querySelector("textarea").value = service[query][1];
    }
}