const body = document.body
const viewports = document.querySelectorAll("div.viewport")
const info = document.getElementById('info')


function mapear(
    number,
    inMin,
    inMax,
    outMin,
    outMax
) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const addOnLoad = (fun) => window.addEventListener("load", fun, {once: true})
const addOnWindowResize = (fun) => window.addEventListener("resize", fun)
const addOnMouseMove = (fun) => window.addEventListener("mousemove", fun)



const showBaixaImg = () => {
    const baixaImg = document.getElementById("baixaImg")
    baixaImg.style.opacity = 1
}