const text = 'Contact Us';

if (window.location.href.includes("?"))
{
    const service = {"web": 0, "app": 1};
    let query = window.location.href.split("?").splice(1)[0].split("&")[0].split("=")[1];
    if (query.includes("#"))
    {
        document.querySelector("select").selectedIndex = service[query.split("#")[0]];
    }
    else
    {
        document.querySelector("select").selectedIndex = service[query];
    }
}