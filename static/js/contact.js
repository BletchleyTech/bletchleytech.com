const text = 'Contact Us';

const services = 
{
    "information": [0, 
        {
            default: "I would like to get more information on all/some (name which) of your services."
        }
    ],
    "web": [1, 
        {
            front: "I'm interested in your Front End Web Development service.",
            back: "I'm interested in your Back End Web Development service.",
            full: "I'm interested in your Full Stack Web Development service.",
            default: "I'm interested in your Front End/Back End/Full Stack (choose one) Web Development service."
        }
    ], 
    "app": [2, 
        {
            native: "I'm interested in your Native App Development service.",
            hybrid: "I'm interested in your Hybrid App Development service.",
            default: "I'm interested in your Native/Hybrid (choose one) App Development service."
        }
    ], 
    "game": [3, 
        {
            mobile: "I'm interested in your Mobile Game Development service.",
            desktop: "I'm interested in your Desktop Game Development service.",
            console: "I'm interested in your Console Game Development service.",
            default: "I'm interested in your Mobile/Desktop/Console (choose one) Game Development service.",
        }
    ], 
    "enterprise": [4, 
        {
            default: "I'm interested in your Enterprise App Development service."
        }
    ], 
    "vr": [5, 
        {
            default: "I'm interested in your Virtual Reality Development service."
        }
    ]
};

const form = () => {
    if (window.location.href.includes("?"))
    {
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
    } else {
        document.querySelector("textarea").value = services["information"][1].default;
    }
}

document.querySelector(".bi-arrow-down-short").addEventListener("click", form);

form();

document.querySelector("form").addEventListener("input", () => {
    window.onbeforeunload = () => {
        return "";
    }
});

document.querySelectorAll("input:last-of-type")[1].addEventListener("click", () => { 
    window.onbeforeunload = {}; 
});

document.querySelector("select#service").addEventListener("input", (event) => {
    document.querySelector("textarea").value = services[event.target.value.toLowerCase()][1].default;
});