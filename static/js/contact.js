const text = 'Contact Us';

const form = () => {
    if (window.location.href.includes("?"))
    {
        const services = 
        {
            "web": [0, 
                {
                    front: "I'm interested in your Front End Web Development service.",
                    back: "I'm interested in your Back End Web Development service.",
                    full: "I'm interested in your Full Stack Web Development service.",
                    default: "I'm interested in your Front End/Back End/Full Stack (choose one) Web Development service."
                }
            ], "app": [1, 
                {
                    native: "I'm interested in your Native App Development service.",
                    hybrid: "I'm interested in your Hybrid App Development service.",
                    default: "I'm interested in your Native/Hybrid (choose one) App Development service."
                }
            ]
        };
        let query = window.location.href.split("?")[1];
        if (query.includes("#"))
        {
            if (query.includes("&"))
            {
                const service = window.location.href.split("?")[1].split("#")[0].split("&")[0].split("=")[1];
                const type = window.location.href.split("?")[1].split("#")[0].split("&")[1].split("=")[1];
                document.querySelector("select").selectedIndex = services[service][0];
                if (Object.keys(services[service][1]).includes(type)) 
                {
                    document.querySelector("textarea").value = Object.values(services[service][1])[Object.keys(services[service][1]).indexOf(type)];
                } 
                else 
                {
                    document.querySelector("textarea").value = services[service][1].default;
                }
            }
            else
            {
                document.querySelector("select").selectedIndex = services[query.split("#")[0].split("=")[1]][0];
                document.querySelector("textarea").value = services[query.split("#")[0].split("=")[1]][1].default;
            }
        }
        else
        {
            if (query.includes("&"))
            {
                const service = window.location.href.split("?")[1].split("#")[0].split("&")[0].split("=")[1];
                const type = window.location.href.split("?")[1].split("#")[0].split("&")[1].split("=")[1];
                document.querySelector("select").selectedIndex = services[service][0];
                if (Object.keys(services[service][1]).includes(type)) 
                {
                    document.querySelector("textarea").value = Object.values(services[service][1])[Object.keys(services[service][1]).indexOf(type)];
                } 
                else 
                {
                document.querySelector("textarea").value = services[service][1].default;
                }
            }
            else
            {
                query = query.split("=")[1];
                document.querySelector("select").selectedIndex = services[query][0];
                document.querySelector("textarea").value = services[query][1].default;
            }
        }
    }
}

document.querySelector(".bi-arrow-down-short").addEventListener("click", form);

form();